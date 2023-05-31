# frozen_string_literal: true

require "spec_helper"

describe "Homepage proposals slider", type: :system, js: true do
  let(:organization) { create(:organization) }
  let!(:hero) { create :content_block, organization: organization, scope_name: :homepage, manifest_name: :hero }
  let!(:slider) { create :proposals_slider, organization: organization }

  before do
    switch_to_host(organization.host)
  end

  context "when has no settings" do
    it "does not display the slider" do
      visit decidim.root_path

      expect(page).not_to have_content("Proposals slider")
    end
  end

  context "when has a default component" do
    let!(:component) { create :proposal_component, organization: organization }
    let!(:proposals) { create_list :proposal, 12, component: component, skip_injection: true }
    let!(:slider) { create :proposals_slider, organization: organization, settings: { linked_components_id: [component.id], default_linked_component: component.id } }

    it "displays the slider but not the filters" do
      visit decidim.root_path

      expect(page).to have_content("EXPLORE PROPOSALS")
      expect(page).not_to have_css(".filters")
    end

    context "and filters" do
      let!(:slider) { create :proposals_slider, organization: organization, settings: { linked_components_id: [component.id], default_linked_component: component.id, activate_filters: true } }

      it "displays the slider and the filters" do
        visit decidim.root_path

        expect(page).to have_content("EXPLORE PROPOSALS")
        expect(page).to have_css(".filters")
      end
    end
  end
end
