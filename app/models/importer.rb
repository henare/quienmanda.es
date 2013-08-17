class Importer
  attr_reader :entities, :relation_types
  attr_accessor :preprocessor

  def initialize(source_name: :source, role_name: :role, target_name: :target)
    @entities = {}
    @relation_types = {}
    @preprocessor = nil

    @source_name = source_name
    @role_name = role_name
    @target_name = target_name
  end

  def match(facts)
    results = []
    facts.each do |fact|
      # Process all records, and add a reference to the original input Fact
      if preprocessor
        new_facts = preprocessor.call(fact)
        # This is a bit convoluted because the preprocessor can return one or many items
        new_facts = [new_facts] unless new_facts.respond_to?(:each)
        new_facts.each do |f| 
          results << match_fact(f).merge(fact: fact)
          f.reload unless f.new_record? # Undo potential changes done by the preprocessor
        end
      else
        results << match_fact(fact).merge(fact: fact)
      end
    end
    results
  end

  private

  def match_fact(fact)
    # Check whether we've seen this datum before
    role = fact.properties[@role_name]
    if @relation_types[role]
      @relation_types[role][:count] += 1

    else  # Try to find an existing RelationType matching the imported data
      relation_type = match_relation_type(role)
      @relation_types[role] = { count: 1, object: relation_type }
    end


    # Check whether we've seen this datum before
    source = fact.properties[@source_name]
    if @entities[source]
      @entities[source][:count] += 1

    else  # Try to find an existing Entity matching the imported data
      relation_type = match_source_entity(source)
      @entities[source] = { count: 1, object: relation_type }
    end


    # Check whether we've seen this datum before
    target = fact.properties[@target_name]
    if @entities[target]
      @entities[target][:count] += 1

    else  # Try to find an existing Entity matching the imported data
      relation_type = match_target_entity(target)
      @entities[target] = { count: 1, object: relation_type }
    end

    # Return matched data
    {
      source: @entities[source][:object],
      target: @entities[target][:object],
      relation_type: @relation_types[role][:object]
    }
  end

  def match_relation_type(relation_type)
    relation_type && RelationType.find_by(["lower(description) = ?", relation_type.downcase])
  end

  def match_source_entity(source)
    source && Entity.find_by(["lower(name) = ?", source.downcase])
  end

  def match_target_entity(target)
    target && Entity.find_by(["lower(name) = ?", target.downcase])
  end
end