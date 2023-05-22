# frozen_string_literal: true

module Decidim
  module HomepageProposals
    # This is the engine that runs on the public interface of `HomepageProposals`.
    class AdminEngine < ::Rails::Engine
      isolate_namespace Decidim::HomepageProposals::Admin

      paths["db/migrate"] = nil
      paths["lib/tasks"] = nil

      routes do
        # Add admin engine routes here
        # resources :homepage_proposals do
        #   collection do
        #     resources :exports, only: [:create]
        #   end
        # end
        # root to: "homepage_proposals#index"
      end

      def load_seed
        nil
      end
    end
  end
end
