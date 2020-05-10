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


/*
* This is the plugin for the pdf viewer
*/
(function(a){a.createModal=function(b){defaults={title:"",message:"Your Message Goes Here!",closeButton:true,scrollable:false};var b=a.extend({},defaults,b);var c=(b.scrollable===true)?'style="max-height: 420px;overflow-y: auto;"':"";html='<div class="modal fade" id="myModal">';html+='<div class="modal-dialog">';html+='<div class="modal-content">';html+='<div class="modal-header">';html+='<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>';if(b.title.length>0){html+='<h4 class="modal-title">'+b.title+"</h4>"}html+="</div>";html+='<div class="modal-body" '+c+">";html+=b.message;html+="</div>";html+='<div class="modal-footer">';if(b.closeButton===true){html+='<button type="button" class="btn btn-primary" data-dismiss="modal">Close</button>'}html+="</div>";html+="</div>";html+="</div>";html+="</div>";a("body").prepend(html);a("#myModal").modal().on("hidden.bs.modal",function(){a(this).remove()})}})(jQuery);

/*
* Here is how you use it
*/
$(function(){    
    $('.view-pdf').on('click',function(){
        var pdf_link = $(this).attr('href');
        var iframe = '<div class="iframe-container"><iframe src="'+pdf_link+'"></iframe></div>'
        $.createModal({
        title:'My Resume',
        message: iframe,
        closeButton:true,
        scrollable:true
        });
        return false;        
    });    
})

sitemapParser(".org-ul");
d3.select(".org-ul").remove();
d3.select(".title").remove();
d3.select("#org-div-home-and-up").remove();
