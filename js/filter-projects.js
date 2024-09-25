const checkboxes = $(".filter-option");
const clearButton = $("#clear-filter");
const productCards = $(".projects-page__item");
const filterOpenBtn = $("#header-projects-page__filter");
const filterWindow = $(".header-projects-page__types");
const filterCloser = $(".filter-closer");

checkboxes.on("change", function () {
  const anyChecked = checkboxes.toArray().some((cb) => $(cb).is(":checked"));
  if (anyChecked) {
    clearButton.removeAttr("disabled").addClass("enabled");
  } else {
    clearButton.attr("disabled", "true").removeClass("enabled");
  }
  filterProducts();
});

function filterProducts() {
  const selectedFilters = checkboxes
    .filter(":checked")
    .map(function () {
      return $(this).val();
    })
    .get();

  productCards.each(function () {
    const cardType = $(this).data("type");
    if (selectedFilters.length === 0 || selectedFilters.includes(cardType)) {
      $(this).show();
    } else {
      $(this).hide();
    }
  });
}

clearButton.on("click", function () {
  checkboxes.prop("checked", false);
  clearButton.attr("disabled", "true").removeClass("enabled");
  filterProducts();
});

filterOpenBtn.on("click", function () {
  filterWindow.slideToggle("active");
  filterOpenBtn.toggleClass("active");
  filterCloser.removeClass("active");
});
$(".filter-closer").on("click", function () {
  filterWindow.slideUp("active");
});

