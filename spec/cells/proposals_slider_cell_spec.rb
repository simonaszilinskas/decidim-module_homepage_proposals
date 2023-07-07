# frozen_string_literal: true

require "spec_helper"

module Decidim::HomepageProposals::ContentBlocks
  describe ProposalsSliderCell, type: :cell do
    let(:cell) { described_class.new }
    let(:current_organization) { create(:organization) }
    let(:linked_components) { create_list(:component, 2) }
    let(:content_block_settings) { create(:content_block, organization: current_organization).settings }

    before do
      allow(cell).to receive(:current_organization).and_return(current_organization)
      allow(cell).to receive(:params).and_return(filter: { component_id: linked_components.first.id })
      allow(cell).to receive(:content_block_settings).and_return(content_block_settings)
      allow(cell).to receive(:linked_components).and_return(linked_components)
    end

    describe "#default_linked_component_path" do
      it "returns the path of the main component" do
        expect(cell.default_linked_component_path).to eq(cell.main_component_path(linked_components.first))
      end
    end

    describe "#options_for_default_component" do
      it "returns options for the default component" do
        options = cell.linked_components.map do |component|
          ["#{cell.translated_attribute(component.name)} (#{cell.translated_attribute(component.participatory_space.title)})", component.id]
        end

        expect(cell.options_for_default_component).to eq(cell.options_for_select(options, selected: linked_components.first.id))
      end
    end

    describe "#content_block_settings" do
      it "returns the content block settings" do
        expect(cell.content_block_settings).to eq(content_block_settings)
      end
    end

    describe "#linked_components" do
      it "returns the linked components" do
        expect(cell.linked_components).to eq(linked_components)
      end
    end

    describe "#default_filter_params" do
      it "returns the default filter parameters" do
        expect(cell.default_filter_params).to eq({
                                                   scope_id: nil,
                                                   category_id: nil,
                                                   component_id: nil
                                                 })
      end
    end

    describe "#categories_filter" do
      it "returns the categories filter" do
        categories = linked_components.map(&:categories).flatten
        expect(cell.categories_filter).to eq(Decidim::Category.where(id: categories))
      end
    end

    describe "#selected_component_id" do
      it "returns the selected component id" do
        expect(cell.selected_component_id).to eq(linked_components.first.id)
      end
    end
  end
end
