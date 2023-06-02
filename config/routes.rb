# frozen_string_literal: true

Rails.application.routes.draw do
  get "proposals_slider/refresh_proposals", to: "decidim/proposals_slider#refresh_proposals"
end
