# frozen_string_literal: true

class ProposalsSliderController < ApplicationController
  include Decidim::NeedsOrganization
  include Decidim::FilterResource
  # include Decidim::Core::Engine.routes.url_helpers
  # include Decidim::Proposals::Engine.routes.url_helpers
  def refresh_proposals
    render partial: "decidim/shared/homepage_proposals/slider_proposals", locals: {
      glanced_proposals: cell("decidim/homepage_proposals/content_blocks/proposals_slider").glanced_proposals
    }
  end
end
