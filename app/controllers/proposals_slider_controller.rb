# frozen_string_literal: true

class ProposalsSliderController < ApplicationController
  def refresh_proposals
    # This method is called from the cell view
    # It refreshes the proposals in the cell
    cell = cell("decidim/homepage_proposals/content_blocks/proposals_slider")
    cell.refresh_proposals
  end
end
