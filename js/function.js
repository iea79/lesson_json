let list = $('.productList'),
    hello = 'Hello',
    price = 2000 * 1.3,
    listItem = $('.productList__item');

// console.log(price);


let arr = {
    name: 'Jonh',
    age: 25,
    skill: ['html', 'js', 'css']
};

// console.log(arr);

let num = '4';

if (num < 5) {
    // console.log('< 5');
}
if (num == 5) {
    // console.log('= 5');
}
if (num > 5) {
    // console.log('> 5');
}

switch (num) {
    case '5':
        // console.log('5');
        break;
    case '6':
        // console.log('6');
        break;
    case '7':
        // console.log('7');
        break;
    default:
        // console.log('Нет совпадений');
}

function getList(item) {

    console.log(item.length + ' товаров');
}

$('body').on('click', '.js_showMore', function(event) {
    getList($('.header__nav li'));
    listItem.toggleClass('active');
});

$('.productList__action .btn').on('click', function() {
    let listItem = $(this).closest('.productList__item');

    // listItem.toggleClass('active');

    // listItem.find('.productList__name').remove();

    console.log(listItem.index());

});

let btn = `<div class="productMore">
            <button class="btn btn_success js_showMore" type="submit">show More item</button>
        </div>`;

// list.append(btn);

// list.html(btn);


let numArr = [1,2,3,4,5];


let itemTempl = `<div class="productList__item">
                  <div class="productList__content">
                    <div class="productList__img"><img src="img/bug1.png" alt=""></div>
                    <div class="productList__description">
                      <div class="productList__name">EMS Women bAG</div>
                      <div class="productList__price">$300</div>
                      <div class="productList__action">
                        <button class="btn" type="button">bUY NOW</button>
                      </div>
                    </div>
                  </div>
                </div>`;

for (var i = 0; i < numArr.length; i++) {
    list.append(itemTempl);
}
