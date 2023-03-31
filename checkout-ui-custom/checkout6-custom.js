// WARNING: THE USAGE OF CUSTOM SCRIPTS IS NOT SUPPORTED. VTEX IS NOT LIABLE FOR ANY DAMAGES THIS MAY CAUSE. THIS MAY BREAK YOUR STORE AND STOP SALES. IN CASE OF ERRORS, PLEASE DELETE THE CONTENT OF THIS SCRIPT.
!(function (window, jQuery) {
  jQuery(function ($) {
    var disablePersonalInfoEditButton = {
      init: function init() {
        util.waitElement($("#edit-profile-data"), function () {
          $(
            ".accordion-toggle.collapsed .link-box-edit.btn.btn-small"
          ).remove();
          $("#is-not-me").remove();
        });
      },
    };

    var poNumberFeature = {
      showInputOnPOSection: false,
      init: function init() {
        poNumberInput.init();
        fakeSubmitButton.init();
        util.onPageStopLoading(function () {
          if (poNumberFeature.showInputOnPOSection) {
            $(
              ".box-payment-group2.box-payment-option.custom201PaymentGroupPaymentGroup"
            ).append(poNumberInput.input);
          } else {
            $(".payment-submit-wrap").append(poNumberInput.input);
          }

          originalSubmitButton.hide();
          $(".payment-submit-wrap").append(fakeSubmitButton.btn);
        });
        util.waitElement($("#payment-data-submit"), function () {});
      },
    };

    var fakeSubmitButton = {
      btn: null,
      init: function init() {
        fakeSubmitButton.btn = fakeSubmitButton.buildButton();
        fakeSubmitButton.btn.on("click", function () {
          theCheckout.handleSubmit();
        });
      },
      buildButton: function buildButton() {
        return $(
          '<button class="jsSubmitFakeButton btn btn-success btn-large btn-block">\n        <i class="icon-lock"></i>\n        <i class="icon-spinner icon-spin" style="display: none;"></i>\n        <span>Place Order</span>\n      </button>'
        );
      },
      hideLoadingAndResetButton: function hideLoadingAndResetButton() {
        fakeSubmitButton.btn.find("i.icon-spinner").hide();
        fakeSubmitButton.btn.find("i.icon-lock").show();
        fakeSubmitButton.enableButton();
      },
      setButtonAsLoading: function setButtonAsLoading() {
        fakeSubmitButton.btn.find("i.icon-lock").hide();
        fakeSubmitButton.btn.find("i.icon-spinner").show();
        fakeSubmitButton.disableButton();
      },
      disableButton: function disableButton() {
        fakeSubmitButton.btn.attr("disabled", "");
      },
      enableButton: function enableButton() {
        fakeSubmitButton.btn.removeAttr("disabled");
      },
    };

    var originalSubmitButton = {
      hide: function hide() {
        $("[id=payment-data-submit]").css("visibility", "hidden");
        $("[id=payment-data-submit]").css("max-height", "0");
        $("[id=payment-data-submit]").css("height", "0");
        $("[id=payment-data-submit]").addClass("jsSubmitButton");
      },
    };

    var poNumberInput = {
      input: null,
      init: function init() {
        poNumberInput.input = poNumberInput.buildInput();
      },
      buildInput: function buildInput() {
        return $(
          '\n        <div style="\n          padding-right: 15px;\n          margin-bottom: 10px;\n        " id="poWrap">\n        <label> Purchase Order Number: (optional) </label>\n          <input \n            type="text"\n            id="poNumberInput" style="\n            font-size: 20px;\n            height: 36px;\n            line-height: 34px;\n            width: 100%;" \n            name="poNumber">\n          <span class="help error feedback" style="display: none">This field is required.</span>\n        </div>'
        );
      },
      showError: function showError() {
        $("#poNumberInput").addClass("error");
        $("#poWrap").find(".feedback").show();
      },
      hideError: function hideError() {
        $("#poNumberInput").removeClass("error");
        $("#poWrap").find(".feedback").hide();
      },
      handleEmpty: function handleEmpty() {
        poNumberInput.showError();
        $("#poNumberInput").on("keypress", poNumberInput.hideError);
      },
    };

    var util = {
      waitElement: function waitElement(selector, fn) {
        var element = setInterval(function () {
          if ($(selector).length) {
            clearInterval(element);
            fn();
          }
        }, 200);
      },
      onOrignalButtonStopLoading: function onOrignalButtonStopLoading(fn) {
        var internal = setInterval(function () {
          if (!!!$(".jsSubmitButton").prop("disabled")) {
            clearInterval(internal);
            fn();
          }
        }, 200);
      },
      onPageStopLoading: function onPageStopLoading(fn) {
        var internal = setInterval(function () {
          if (!$("body.loading").length) {
            clearInterval(internal);
            fn();
          }
        }, 200);
      },
      onEmailIsSet: function onEmailIsSet(fn) {
        var internal = setInterval(function () {
          if (!!$(".client-profile-email span.email").text()) {
            clearInterval(internal);
            fn();
          }
        }, 200);
      },
    };

    var theCheckout = {
      submit: function submit() {
        $("#payment-data-submit").click();
      },
      handleSubmit: function handleSubmit() {
        var poNumber = {
          value: $("#poNumberInput")[0].value,
        };
        fakeSubmitButton.setButtonAsLoading();
        util.onOrignalButtonStopLoading(function () {
          fakeSubmitButton.enableButton();
          fakeSubmitButton.hideLoadingAndResetButton();
        });
        vtexjs.checkout.getOrderForm().then(function (data) {
          console.log("here: " + poNumber.value);

          if (!!poNumber.value) {
            $.ajax({
              type: "PUT",
              url: "/api/checkout/pub/orderForm/".concat(
                data.orderFormId,
                "/customData/profile/poNumber"
              ),
              data: poNumber,
              dataType: "json",
            }).then(theCheckout.submit);
          } else {
            theCheckout.submit();
          }
        });
      },
    };

    $(window).on("checkoutRequestBegin.vtex", function (event, orderForm) {
      if(document.querySelector("#clear-cart")) {
        document.querySelector("#clear-cart").innerText = "Clear Cart";
      }
      fakeSubmitButton.setButtonAsLoading();
      setTimeout(function () {
        fakeSubmitButton.hideLoadingAndResetButton();
      }, 1000);
    });

    poNumberFeature.init();
    disablePersonalInfoEditButton.init();
  });
})(window, window.jQuery);

window.addEventListener("DOMContentLoaded", () => {
  $(window).on(
      'orderFormUpdated.vtex ' +
      'renderLoaderReady.vtex ' +
      'paymentUpdated.vtex ' +
      'stateUpdated.vtex ' +
      'deliverySelected.vtex ' +
      'shippingInformationUpdated.vtex ' +
      'shippingRatePreviewLoading.vtex ' +
      'transactionValidation.vtex ' +
      'omniShippingChanged.vtex ' +
      'componentValidated.vtex ' +
      'componentDone.vtex ' +
      'checkoutRequestBegin.vtex ' +
      'hashchange', () => {

      if (!$('.demo-store-warning').length) {
          const demoWarning = '<div class="demo-store-warning">Attention! This is a VTEX platform demo store. Products, prices and deliveries are merely illustrative.</div>';
          $('.summary-template-holder').append(demoWarning);
      }

      if (!$('#continue-shopping-button').length) {
          $('.btn-place-order-wrapper').append($('<a href="/" target="_self" id="continue-shopping-button" class="btn btn-large btn-secondary">Keep buying</a>'));
      }

      const cartToOrderFormElement = document.getElementById('cart-to-orderform')
      const htmlCartToOrderForm = `
          PROCEED
          <svg width="14" height="12" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12.9142 4.58594L8.62115 0.292942L7.20715 1.70694L10.5002 4.99994H0.500153V6.99994H10.5002L7.20715 10.2929L8.62115 11.7069L12.9142 7.41394C13.2891 7.03889 13.4997 6.53027 13.4997 5.99994C13.4997 5.46961 13.2891 4.961 12.9142 4.58594Z" fill="white"/>
         </svg>
      `
      $(cartToOrderFormElement).html(htmlCartToOrderForm);
      var observer = new MutationObserver(() => {
        observer.disconnect();
        $(cartToOrderFormElement).html(htmlCartToOrderForm);
      });

      observer.observe(cartToOrderFormElement, {
        childList: true,
        attributes: true,
        characterData: true,
        subtree: true,
        attributeOldValue: true,
        characterDataOldValue: true
      });
  });
});