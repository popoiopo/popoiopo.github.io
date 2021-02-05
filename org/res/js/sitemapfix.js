$(function() {
  // ------------------------------------------------------- //
  // Multi Level dropdowns
  // ------------------------------------------------------ //
  $("ul.dropdown-menu [data-toggle='dropdown']").on("click", function(event) {
    event.preventDefault();
    event.stopPropagation();

    $(this).siblings().toggleClass("show");


    if (!$(this).next().hasClass('show')) {
      $(this).parents('.dropdown-menu').first().find('.show').removeClass("show");
    }
    $(this).parents('li.nav-item.dropdown.show').on('hidden.bs.dropdown', function(e) {
      $('.dropdown-submenu .show').removeClass("show");
    });

  });
});

function dropdownPopulator(current, categories) {
    for (property in categories) {
	var category = categories[property]
	if (current.text().includes(category)) {
	var category = "." + category
	current.children().children().each(function(index) {
	    var current = $(this);
	    current.addClass("dropdown-item");
	    $(category).append($(this));
	    $(category).append("<div class=\"dropdown-divider\"></div>")
	})
    }
    }
}

function sitemapParser(sitemap_id) {
    sitemap = $(sitemap_id).first();
    var children = sitemap.children();
    children.each(function(index){
	current = $( this );
	if (current.text().includes("Blog")) {
	    current.children().children().each(function(index) {
		var categories = ["ComplexityScience", "Emacs", "ComputationalModelling"]
		dropdownPopulator($(this), categories)
	    })
	} else if (current.text().includes("Tutorial")) {
	    current.children().children().each(function(index) {
		var categories = ["Python"]
		dropdownPopulator($(this), categories)
	})
	} else if (current.text().includes("Presentations")) {
	    current.children().children().each(function(index) {
		var categories = ["Complexity"]
		dropdownPopulator($(this), categories)
	})
	} else if (current.text().includes("Personal")) {
	    current.children().children().each(function(index) {
		var current = $(this);
		current.addClass("dropdown-item");
		$(".Personal").append($(this));
		$(".Personal").append("<div class=\"dropdown-divider\"></div>")
	    })
	}
    });
}

sitemapParser(".org-ul");
d3.select(".org-ul").remove();
d3.select(".title").remove();
d3.select("#org-div-home-and-up").remove();
