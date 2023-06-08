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

        private

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

        def default_filter_params
          {
            scope_id: nil,
            category_id: nil,
            component_id: nil
          }
        end

        def categories_filter
          @categories_filter ||= Decidim::Category.where(id: linked_components.map(&:categories).flatten)
        end
      end
    end
  end
end
