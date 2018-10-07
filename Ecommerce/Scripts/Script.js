$(document).ready(function () {
    // Get Cookie from Browser
    checkCookie();

    // Function to request list of Potions from Ecommerce API 
    getPotionList();

    function getPotionList() {
        // this code is for simulate request GET from RESTFul API
        $.ajax({
            url: "../Content/potions.json",
            dataType: "json",
            type: "GET",
            data: {},
            success: function (data) {
                if (data) {
                    setData(data);
                }
            }
        });
    }
    
    function checkCookie() {
        var cookieCart = document.cookie;
        var cookieQuantity = cookieCart.split("SESSIONCART=")[1];
        var element = $(".quantity");

        if (cookieQuantity != null) {
            element.text(cookieQuantity);
        } else {
            element.text(0);
        }
    }

    $(document).on("click", ".btn-cart", function (event) {
        var element = $(".quantity");
        var cartQuantity = parseInt(element.text());
        var total = cartQuantity + 1;
        console.log(total);
        element.text(total);
        document.cookie = "SESSIONCART=" + total;
    });

    function setData(data) {
        var row = $(".add-list");
        var html = "";
        jQuery.each(data.potions, function (index, item) {
            var ingredients = "";
            jQuery.each(data.potions[index].ingredients, function (i, ingredient) {
                ingredients += '<li>' + ingredient + '</li>\n'
            });
            html += '<div class="col-6 col-md-4 text-center product-wrapper">\n' +
                '            <img class="mw-100" src="../Content/Images/Products/' + item.image + '" />\n' +
                '            <div class="middle">\n' +
                '                <button type="button" class="btn text" data-toggle="modal" data-target="#' + item.name.split(" ")[0] + '">\n' +
                '                    VER MAIS\n' +
                '                </button>\n' +
                '            </div>\n' +
                '            <span class="product-title">' + item.name + '</span> - <span class="price">$' + item.price + '</span>\n' +
                '       </div>' +
                '       <div class="modal fade" id="' + item.name.split(" ")[0] + '" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">\n' +
                '           <div class="modal-dialog modal-dialog-centered modal-lg" role="document">\n' +
                '               <div class="modal-content">\n' +
                '                   <div class="container">\n' +
                '                       <div class="row">\n' +
                '                           <div class="col-12 col-md-6">\n' +
                '                               <img class="mw-100" src="../Content/Images/Products/' + item.image + '" />\n' +
                '                           </div>\n' +
                '                           <div class="col-12 col-md-6">\n' +
                '                               <h3>' + item.name + '</h3>\n' +
                '                               <h4>Use/Effect:</h4>\n' +
                '                               <p>' + item.effect + '</p>\n' +
                '                               <h3>Ingredients:</h3>\n' +
                '                               <ul>\n' +
                ingredients +
                '                               </ul>\n' +
                '                               <h4>Price:</h4>\n' +
                '                               <p class="price">$' + item.price + '</p>\n' +
                '                               <button class="btn btn-cart my-2 my-sm-0">ADD TO CART</button>\n' +
                '                           </div>\n' +
                '                           <button type="button" class="close" data-dismiss="modal" aria-label="Close"><i class="fas fa-times"></i></button>\n' +
                '                       </div>\n' +
                '                   </div>\n' +
                '               </div>\n' +
                '           </div>\n' +
                '     </div>'
        });
        row.append(html);
    }
});
