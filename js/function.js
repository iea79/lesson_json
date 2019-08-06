let url = 'https://script.google.com/macros/s/AKfycbzMyVjjQzwfMXfJLcSlWbUsoIk43tZlXzmuE210gOnYaew5pDg/exec',
    appData = [],
    prodList = $('.productList'),
    template = '';

// console.log($.get(url));

$.getJSON(url, function(json, status) {
    appData = json.result;

    prodList.html('');

    // console.log(status);
    // console.log(json);
    // console.log(json.result);


    for (let i = 0; i < appData.length; i++) {

        template = `<div class="productList__item">
              <div class="productList__content">
                <div class="productList__img"><img src="`+appData[i][4]+`" alt=""></div>
                <div class="productList__description">
                  <div class="productList__name">`+appData[i][1]+`</div>
                  <div class="productList__price">$`+appData[i][2]+`</div>
                  <div class="productList__action">
                    <button class="btn" type="button">bUY NOW</button>
                  </div>
                </div>
              </div>
            </div>`;

        if (i > 5) {
            return false;
        } else {
            prodList.append(template);
        }

    }

});


$('.js_showMore').on('click', function() {
    $.getJSON(url, function(json, status) {
        appData = json.result;
        // console.log(status);
        // console.log(json);
        // console.log(json.result);


        for (let i = 6; i < appData.length; i++) {

            template = `<div class="productList__item">
                  <div class="productList__content">
                    <div class="productList__img"><img src="`+appData[i][4]+`" alt=""></div>
                    <div class="productList__description">
                      <div class="productList__name">`+appData[i][1]+`</div>
                      <div class="productList__price">$`+appData[i][2]+`</div>
                      <div class="productList__action">
                        <button class="btn" type="button">bUY NOW</button>
                      </div>
                    </div>
                  </div>
                </div>`;

            prodList.append(template);

        }
    });
})
