# frozen_string_literal: true

module Decidim
  module HomepageProposals
    module ContentBlocks
      class ProposalsSliderCell < Decidim::ViewModel
        attr_accessor :glanced_proposals

        include Cell::ViewModel::Partial
        include Core::Engine.routes.url_helpers
        include Decidim::CardHelper
        include Decidim::IconHelper
        include ActionView::Helpers::FormOptionsHelper
        include Decidim::FiltersHelper
        include Decidim::FilterResource
        include Decidim::LayoutHelper

        MAX_PROPOSALS = 12

        def glanced_proposals
          return default_proposals unless content_block_settings.activate_filters

          if params[:filter].present?
            category = Decidim::Category.find(params[:filter][:category_id]) if params[:filter][:category_id].present?
            scopes = Decidim::Scope.find(params[:filter][:scope_id]) if params[:filter][:scope_id].present?
          end

          @glanced_proposals ||= Decidim::Proposals::Proposal.published
                                                           .where(component: content_block_component)
                                                           .where(filter_by_scopes(scopes))
                                                           .where(filter_by(:category, category))
                                                           .sample(MAX_PROPOSALS)
        end

        def rerender!
          byebug
          if glanced_proposals.present?
            render partial: "decidim/shared/homepage_proposals/slider_proposals", locals: { glanced_proposals: glanced_proposals }
          else
            render '_no_proposals'
          end
        end

        private

        def search_klass
          ProposalsSearch
        end

        def filter_by(name, filter)
          { name => filter.id } if filter.present?
        end

        def filter_by_scopes(scopes)
          { scope: scopes } if scopes.present?
        end

        def filter_category(category)
          { category: category } if category.present?
        end

        def content_block_settings
          @content_block_settings ||= Decidim::ContentBlock.find_by(
            manifest_name: "proposals_slider",
            organization: current_organization
          ).settings
        end

        def options_for_default_component
          components = Decidim::Component.where(id: content_block_settings.linked_components_id.reject(&:blank?).map(&:to_i))
          options = components.map do |component|
            ["#{translated_attribute(component.name)} (#{translated_attribute(component.participatory_space.title)})", component.id]
          end

          return options_for_select(options, selected: params[:filter][:component_id]) if params[:filter].present? && params[:filter][:component_id].present?

          options_for_select(options, selected: content_block_settings.default_linked_component)
        end

        def linked_components
          @linked_components ||= Decidim::Component.where(id: content_block_settings.linked_components_id.reject(&:blank?).map(&:to_i))
        end

        def proposal_title(proposal)
          translated_attribute(proposal.title)
        end

        def proposal_description(proposal)
          translated_attribute(proposal.body)
        end

        def proposal_path(proposal)
          Decidim::ResourceLocatorPresenter.new(proposal).path
        end

        def default_filter_params
          {
            scope_id: nil,
            category_id: nil,
            component_id: nil
          }
        end

        def categories_filter
          @categories_filter ||= Decidim::Category.where(id: Decidim::Proposals::Proposal.where(component: linked_components).pluck(:id).uniq)
        end

        def scopes_filter
          @scopes_filter ||= Decidim::Scope.where(id: Decidim::Proposals::Proposal.where(component: linked_components).pluck(:id).uniq)
        end

        def components_filter
          @components_filter ||= linked_components
        end

        def default_proposals
          @default_proposals ||= Decidim::Proposals::Proposal.published.where(component: content_block_settings.default_linked_component).sample(MAX_PROPOSALS)
        end

        # TODO: Ensure component can be displayed and is authorized
        # TODO: Prevent Component extraction using filter params
        def content_block_component
          return content_block_settings.default_linked_component if params.dig(:filter, :component_id).blank?
          return content_block_settings.default_linked_component unless params.dig(:filter, :component_id).match?(/\d+/)

          Decidim::Component.find(params.dig(:filter, :component_id).to_i)
        end
      end
    end
  end
end
