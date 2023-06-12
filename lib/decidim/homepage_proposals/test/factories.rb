# frozen_string_literal: true

require "decidim/core/test/factories"

FactoryBot.define do
  factory :proposals_slider, parent: :content_block do
    manifest_name { :proposals_slider }
    scope_name { :homepage }
    settings do
      {
        activate_filters: false,
        linked_components_id: [],
        default_linked_component: nil
      }
    end
  end
end
