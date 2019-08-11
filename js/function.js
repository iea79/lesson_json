// (function() {
//     // код выполняется автоматически
//     let num = 10;
//     // Выводим переменную num объявленную в данной функции
//     console.log(num);
// })();
//
// (function() {
//     // код выполняется автоматически
//     // выдаст ошибку так как в это функции еще не объявлена переменная num
//     console.log(num);
//     let num = 5;
//     // Выведет 5, переменная объявлена
//     console.log(num);
// })();
// // Выдаст ошибку, так как переменная не определена гобально
// console.log(num);


let url = 'https://script.google.com/macros/s/AKfycbzMyVjjQzwfMXfJLcSlWbUsoIk43tZlXzmuE210gOnYaew5pDg/exec',
    appData = [],
    itemCount,
    prodList = $('.productList'),
    modal = $('#productModal'),
    template = '';

// console.log($.get(url));


$.getJSON(url, function(json, status) {
    prodList.html('');

    showLoader();

    getStatus(status);

    appData = json.result;

    console.log(appData);

    for (let i = 0; i < appData.length; i++) {

        setTemplate(i, appData);

        if (i > 5) {
            hideLoader();
            return false;
        } else {
            prodList.append(template);
            // if (appData[i][5] == 'clothes') {
            // }
        }

    }

});


$('.js_showMore').on('click', function() {

    itemCount = $('.productList__item').length;
    showLoader();

    for (let i = itemCount; i < appData.length; i++) {

        setTemplate(i, appData);

        if (i > itemCount + 5) {
            hideLoader();
            return false;
        } else {
            prodList.append(template);
        }

    }

    hideLoader();
    $('.js_showMore').hide();
    
    // $.getJSON(url, function(json, status) {
    //
    //     getStatus(status);
    //
    //     appData = json.result;
    //
    //     console.log(appData);
    //
    // });

});

// $('[data-season]').on('click', function() {
//
//     let season = $(this).data('season'),
//         filter;
//     console.log(season);
//
//     $.getJSON(url, function(json, status) {
//
//         getStatus(status);
//
//         // appData = [1,2,3,4,5,6,7,8,9,10];
//
//         let filter = json.result.filter(function(el, i, arr) {
//             // console.log(el);
//             // console.log(i);
//             // console.log(arr);
//
//             if (json.result[i][5] == season) {
//                 return true;
//             } else {
//                 return false;
//             }
//         });
//
//         console.log(filter);
//         prodList.html('');
//
//         for (let i = 0; i < filter.length; i++) {
//
//             setTemplate(i, filter);
//
//             prodList.append(template);
//
//         }
//
//     });
//
//
// })

$('.js_search').on('blur', function() {
    let text = $(this).val();

    let filter = appData.filter(function(el, i) {
        console.log(text);

        let arr = el[1].split(' ');

        console.log(arr);

        return arr.filter(function(arrEl) {
            return arrEl.toLowerCase().indexOf(text);
        }).length === [text].length;


        // if (appData[i][1].toLowerCase() == text.toLowerCase()) {
        //     return true;
        // } else {
        //     return false;
        // }
    });

    console.log(filter);
    prodList.html('');

    if (filter.length > 0) {
        for (let i = 0; i < filter.length; i++) {

            setTemplate(i, filter);

            prodList.append(template);

        }
    } else {
        prodList.html('По вашему запросу ничего не найдено!')
    }
});



$('body').on('click', '.productList__action .btn', function() {
    console.log($(this).closest('.productList__item').index());
    // console.log(appData);

    let index = $(this).closest('.productList__item').index(),
        body = $('.modal-body'),
        modalContent = `<div class="productModal__img">
                            <img src="`+appData[index][4]+`" alt="alt">
                        </div>
                        <div class="productModal__content">
                            <div class="productModal__name">`+appData[index][1]+`</div>
                                <div class="productModal__price">$`+appData[index][2]+`</div>
                                <div class="productModal__description">`+appData[index][3]+`</div>
                                <div class="productModal__action">
                                  <button class="btn" type="button">Buy `+appData[index][1]+`</button>
                            </div>
                        </div>`;


    console.log(modalContent);
    body.html(modalContent);
    modal.modal('show');

    // $(this).index()
});


function setTemplate(i, arr) {
    template = `<div class="productList__item">
          <div class="productList__content">
            <div class="productList__img"><img src="`+arr[i][4]+`" alt=""></div>
            <div class="productList__description">
              <div class="productList__name">`+arr[i][1]+`</div>
              <div class="productList__price">$`+arr[i][2]+`</div>
              <div class="productList__action">
                <button class="btn" type="button">Show info</button>
              </div>
            </div>
          </div>
        </div>`;
};

function getStatus(status) {
    if (status !== 'success') {
        prodList.html('Произошла ошибка при получении данных. Обновите страницу.');
        return false;
    }
}


function showLoader() {
    prodList
        .addClass('loaded')
        .append('<div class="loader"></div>');
};

function hideLoader() {
    setTimeout(function () {
        prodList.removeClass('loaded');
        $('.loader').remove();
    }, 1000);
};
