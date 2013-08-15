module Utils
  def all_articles
    @site.items.select {|i| i.identifier.match(/^\/articles\//) }
  end
end

include Utils
include Nanoc::Helpers::LinkTo
