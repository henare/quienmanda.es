require 'spec_helper'

describe Importer do
  context 'when importing a relation type' do
    before do
      @importer = CnmvImporter.new
    end

    it 'checks male/female variants' do
      @relation = create(:relation_type, description: 'presidente/a')
      match = @importer.match( [ Fact.new(properties: {'Cargo' => 'Presidente'}) ] )
      match.first[:relation_type].should == @relation
    end

    it "ignores trailing 'de'" do
      @relation = create(:relation_type, description: 'presidente/a de')
      match = @importer.match( [ Fact.new(properties: {'Cargo' => 'Presidente'}) ] )
      match.first[:relation_type].should == @relation
    end

    it "ignores trailing vicepresident type" do
      @relation = create(:relation_type, description: 'vicepresidente/a de')
      match = @importer.match( [ Fact.new(properties: {'Cargo' => 'VicePresidente 3º'}) ] )
      match.first[:relation_type].should == @relation
    end

    it 'splits multiple roles' do
      @board_member = create(:relation_type, description: 'consejero/a')
      @president = create(:relation_type, description: 'presidente/a')
      match = @importer.match( [ Fact.new(properties: {'Cargo' => 'Consejero - Presidente'}) ] )
      match.first[:relation_type].should == @board_member
      match.last[:relation_type].should == @president
    end
  end
end