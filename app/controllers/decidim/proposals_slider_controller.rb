# frozen_string_literal: true

module Decidim
  class ProposalsSliderController < Decidim::ApplicationController
    include Decidim::FilterResource
    include Decidim::TranslatableAttributes
    include Decidim::Core::Engine.routes.url_helpers

    def refresh_proposals
      render json: build_proposals_api
    end

    def build_proposals_api
      glanced_proposals.flat_map do |proposal|
        {
          id: proposal.id,
          title: translated_attribute(proposal.title),
          body: translated_attribute(proposal.body),
          url: proposal_path(proposal)
        }
      end
    end

    private

    def glanced_proposals
      if params[:filter].present?
        category = Decidim::Category.find(params[:filter][:category_id]) if params[:filter][:category_id].present?
        scopes = Decidim::Scope.find(params[:filter][:scope_id]) if params[:filter][:scope_id].present?
      end

      @glanced_proposals ||= Decidim::Proposals::Proposal.published
                                                         .where(component: params[:filter][:component_id])
                                                         .where(filter_by_scopes(scopes))
                                                         .where(filter_by(:category, category))
                                                         .sample(12)
    end

    def filter_by(name, filter)
      { name => filter.id } if filter.present?
    end

    def filter_by_scopes(scopes)
      { scope: scopes } if scopes.present?
    end

    def proposal_path(proposal)
      Decidim::ResourceLocatorPresenter.new(proposal).path
    end
  end
end
