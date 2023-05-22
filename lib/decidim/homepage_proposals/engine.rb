# frozen_string_literal: true

require "rails"
require "decidim/core"

module Decidim
  module HomepageProposals
    # This is the engine that runs on the public interface of homepage_proposals.
    class Engine < ::Rails::Engine
      isolate_namespace Decidim::HomepageProposals

      routes do
        # Add engine routes here
        # resources :homepage_proposals
        # root to: "homepage_proposals#index"
      end

      initializer "HomepageProposals.webpacker.assets_path" do
        Decidim.register_assets_path File.expand_path("app/packs", root)
      end
    end
  end
end
