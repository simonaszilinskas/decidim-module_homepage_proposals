# frozen_string_literal: true

base_path = File.expand_path("..", __dir__)

Decidim::Webpacker.register_path("#{base_path}/app/packs")
Decidim::Webpacker.register_entrypoints(
  decidim_homepage_proposals: "#{base_path}/app/packs/entrypoints/decidim_homepage_proposals.js",
  decidim_homepage_proposals_admin: "#{base_path}/app/packs/entrypoints/decidim_homepage_proposals_admin.js"
)
Decidim::Webpacker.register_stylesheet_import("stylesheets/decidim/homepage_proposals/homepage_proposals")
