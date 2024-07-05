// swiper
const swiper = new Swiper("#js-voice-swiper", {
  loop: true,
  slidesPerGroup: 1,
  spaceBetween: 37,
  slidesPerView: 1,

  breakpoints: {
    768: {
      slidesPerView: 2,
      spaceBetween: 23,
    },

    1025: {
      slidesPerView: 3,
      spaceBetween: 23,
    },
  },

  navigation: {
    nextEl: "#js-voice-next",
    prevEl: "#js-voice-prev",
  },
});

// drawer
document.querySelector("#js-drawer-icon").addEventListener("click", function (e) {
  e.preventDefault();

  document.querySelector("#js-drawer-icon").classList.toggle("is-checked");
  document.querySelector("#js-drawer-content").classList.toggle("is-checked");
});

document.querySelectorAll('#js-drawer-content a[href^="#"]').forEach(function (link) {
  link.addEventListener("click", function (e) {
    document.querySelector("#js-drawer-icon").classList.remove("is-checked");
    document.querySelector("#js-drawer-content").classList.remove("is-checked");
  });
});

// FAQタブ切替
document.querySelectorAll(".qa-tab__item").forEach(function (item) {
  item.addEventListener("click", function () {
    document.querySelectorAll(".qa-tab__item, .qa-block").forEach(function (element) {
      element.classList.remove("active");
    });

    this.classList.add("active");

    const index = Array.from(document.querySelectorAll(".qa-tab__item")).indexOf(this);

    document.querySelectorAll(".qa-block")[index].classList.add("active");
  });
});

// アコーディオン
jQuery(".ja-accordion").on("click", function (e) {
  e.preventDefault();

  if (jQuery(this).parent().hasClass("is-open")) {
    jQuery(this).parent().removeClass("is-open");
    jQuery(this).next().slideUp(300);
  } else {
    jQuery(this).parent().addClass("is-open");
    jQuery(this).next().slideDown(300);
  }
});

// to top 非表示
window.addEventListener("scroll", function () {
  if (0 < window.scrollY) {
    document.getElementById("js-to-contact").classList.add("is-show");
  } else {
    document.getElementById("js-to-contact").classList.remove("is-show");
  }
});

// // フェードイン
const intersectionObserver = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-in-view");
    }
  });
});

const inViewItems = document.querySelectorAll(".js-in-view");
inViewItems.forEach(function (inViewItem) {
  intersectionObserver.observe(inViewItem);
});

// googleform
const $form = jQuery("#js-form");
$form.submit(function (e) {
  e.preventDefault(); // フォームのデフォルトの送信を防ぐ
  $.ajax({
    url: $form.attr("action"),
    data: $form.serialize(),
    type: "POST",
    dataType: "xml",
    statusCode: {
      0: function () {
        //送信に成功したときの処理
        $form.slideUp();
        jQuery("#js-success").slideDown();
      },
      200: function () {
        //送信に失敗したときの処理
        $form.slideUp();
        jQuery("#js-error").slideDown();
      },
    },
  });
  return false;
});

// formの入力確認
const $submit = jQuery("#js-submit");
jQuery("#js-form option, #js-form input, #js-form textarea").on("input, change", function () {
  if (
    jQuery('#js-form input[type="text"]').val() !== "" &&
    jQuery('#js-form input[type="email"]').val() !== "" &&
    jQuery('#js-form input[name="entry.228689743"]').prop("checked") === true
  ) {
    // すべて入力された時
    $submit.prop("disabled", false);
    $submit.addClass("-active");
  } else {
    // 入力されていない時
    $submit.prop("disabled", true);
    $submit.removeClass("-active");
  }
});
