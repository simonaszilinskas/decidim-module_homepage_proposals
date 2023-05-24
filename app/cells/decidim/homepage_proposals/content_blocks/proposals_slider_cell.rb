# frozen_string_literal: true

# frozen_string literal: true

module Decidim
  module HomepageProposals
    module ContentBlocks
      class ProposalsSliderCell < Decidim::ViewModel
        include Cell::ViewModel::Partial
        include Core::Engine.routes.url_helpers
        include Decidim::CardHelper
        include Decidim::IconHelper
        include ActionView::Helpers::FormOptionsHelper
        include Decidim::FiltersHelper
        include Decidim::FilterResource

        def glanced_proposals(category: nil, component: nil, scope: nil)
          return Decidim::Proposals::Proposal.where(component: content_block_settings.default_linked_component).sample(12) unless content_block_settings.activate_filters

          proposals = if component.present?
                        Decidim::Proposals::Proposal.joins(:category, :scope).where(component: component)
                      else
                        Decidim::Proposals::Proposal.where(component: content_block_settings.default_linked_component)
                      end

          proposals = proposals.where(scope: scope) if scope.present?
          proposals = proposals.select { |p| p.category == category } if category.present?
          proposals.sample(12)
        end

        private

        def search_klass
          ProposalsSearch
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
            component_id: content_block_settings.linked_components_id
          }
        end
        def categories_filter
          @categories_filter ||= Decidim::Category.where(id: Decidim::Proposals::Proposal.where(component: linked_components).pluck(:id).uniq)
        end

        def scopes_filter
          @locations_filter ||= Decidim::Scope.where(id: Decidim::Proposals::Proposal.where(component: linked_components).pluck(:id).uniq)
        end

        def components_filter
          @components_filter ||= linked_components
        end
      end
    end
  end
end
