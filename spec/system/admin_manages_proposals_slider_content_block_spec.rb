# frozen_string_literal: true

require "spec_helper"

describe "Admin manages proposals slider content blocks", type: :system do
  let(:organization) { create(:organization) }
  let(:user) { create(:user, :admin, :confirmed, organization: organization) }

  before do
    switch_to_host(organization.host)
    login_as user, scope: :user
  end

  context "when trying to editate content blocks" do
    it "shows the proposals slider one" do
      visit decidim_admin.edit_organization_homepage_path

      within ".js-list-availables" do
        expect(page).to have_content("Proposals slider")
      end
    end

    context "when editing a persisted content block" do
      let!(:content_block) { create :content_block, organization: organization, manifest_name: :proposals_slider, scope_name: :homepage }
      let(:proposals_component) { create :component, manifest_name: :proposals }

      it "updates the settings of the content block" do
        visit decidim_admin.edit_organization_homepage_content_block_path(:proposals_slider)

        check "Activate filters"

        #TODO: Add a test for the component selector

        click_button "Update"
        visit decidim.root_path
        expect(page).to have_content("Custom welcome text!")
      end
    end
  end
end
