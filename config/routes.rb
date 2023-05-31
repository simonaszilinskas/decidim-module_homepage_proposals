# frozen_string_literal: true

Rails.application.routes.draw do
  get "proposals_slider/refresh_proposals", to: "proposals_slider#refresh_proposals"
end
