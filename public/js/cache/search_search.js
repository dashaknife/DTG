 


	const $ = function(selector) {

		if (! (this instanceof $) ) {
			return new $(selector);
		}

		if (typeof selector=="object") 
			this.el = [selector]; 
		else 
			this.el = document.querySelectorAll(selector);
		
		return this;
	}

	$.prototype.css = function(prop, val) {
		this.el.forEach(function(element) {
			element.style[prop] = val;
		});
		return this;
	}

	$.prototype.display = function (name){
		this.el.forEach(function(el){
			el.style.display = name
		});
		return this;
	}

	$.prototype.on = function (event, f){
		this.el.forEach(function(el){
			el.addEventListener(event, f)
		});
		return this;
	}

	$.prototype.fadein = function (){
		this.el.forEach(function(el){
			el.classList.add('active')
		});
		return this;
	}

	$.prototype.fadeout = function (){
		this.el.forEach(function(el){
			el.classList.remove('active')
		});
		return this;
	}

	$.prototype.toggleClass = function (classname){
		this.el.forEach(function(el){
			el.classList.toggle(classname)
		});
		return this;
	}

	$.prototype.addClass = function (classname){
		this.el.forEach(function(el){
			el.classList.add(classname)
		});
		return this;
	}

	$.prototype.removeClass = function (classname){
		this.el.forEach(function(el){
			el.classList.remove(classname)
		});
		return this;
	}

	$.prototype.slideUp = function (){
		this.el.forEach(function(el){
			el.style.transition = "all .5s ease-in-out"
			el.style.height = "0px"
			el.setAttribute('data-height',el.offsetHeight)
		});
		return this;
	}

	$.prototype.slideDown = function (){
		this.el.forEach(function(el){
			el.style.transition = "all .5s ease-in-out"
			el.style.height = el.getAttribute('data-height') ?? 'auto'
		});
		return this;
	}

	$.prototype.toggleSlide = function (){
		this.el.forEach(function(el,index){
			el.style.transition = "all 1s ease-in-out"
			console.log(el.offsetHeight);
			if(el.offsetHeight==0) {
				el.style.height = el.getAttribute('data-height') ?? 'auto'
			} else {
				el.style.height = "0px"
				el.setAttribute('data-height',el.offsetHeight)
			}
		});
		return this;
	}

	$.prototype.parent = function (){
		var els = this.el;
		var parents = []
		els.forEach(function(el, index) {
			parents[index] = el.parentElement
		})
		this.el = parents
		return this;
	}

	$.prototype.child = function (){
		var els = this.el;
		var childs = []
		els.forEach(function(el, index) {
			childs[index] = el.firstElementChild
		})
		this.el = childs
		return this;
	}

	$.prototype.val = function(val){
		if ( val !== undefined && val !== null )
			this.el.forEach(function(el, index) {
				el.value = val
			})
	
		return this.el[0].value;
	}

	$.prototype.data = function(attr, val){
		if (val !== undefined && val !== null )
			this.el[0].setAttribute('data-'+attr, val)
		
		return this.el[0].getAttribute('data-'+attr)
	}

	$.prototype.attr = function(attr, val){
		if (val !== undefined && val !== null )
			this.el[0].setAttribute(attr, val)
		
		return this.el[0].getAttribute(attr)
	}

	$.prototype.html = function(html){
		if (html !== undefined && html !== null)
			this.el[0].innerHTML = html
		return this.el[0].innerHTML;
	}

	$.prototype.text = function(text){
		if(text)
			this.el[0].innerText = text
		return this.el[0].innerText;
	}

	$.prototype.height = function(){
		return this.el[0].offsetHeight
	}

	// document.addEventListener('DOMContentLoaded', function(){

		// lazy load START
			/**
			 * Usage: <img srcset="/images/lazy.svg" src="/images/original.png" alt="">
			 */
			function check_lazy() {
				for (var i = lazy_imgs.length - 1; i >= 0; i--) {
					var img = lazy_imgs[i]
					if (img.srcset == '/images/lazy.svg' && img.getBoundingClientRect().top - 100 < window.innerHeight) {
						(function(img) {
							img.onload = () => {
								img.removeAttribute('srcset')
							}
						})(img)
						img.srcset = img.src
					}
				}
			}
			var lazy_imgs = []
			window.addEventListener('DOMContentLoaded', () => {
				lazy_imgs = Array.prototype.slice.call(document.querySelectorAll('img[srcset]'))
				setTimeout(() => {
					check_lazy()
				}, 200)
			})
			window.addEventListener('scroll', () => {
				check_lazy()
			})
		// lazy load END


		function scrollIt(destination, duration = 500, easing = 'easeInOutCubic', callback) {

			const easings = {
				easeInOutCubic(t) {
					return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
				},
			};

			const start = window.scrollY;
			const startTime = 'now' in window.performance ? performance.now() : new Date().getTime();

			const documentHeight = Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight);
			const windowHeight = window.innerHeight || document.documentElement.clientHeight || document.getElementsByTagName('body')[0].clientHeight;
			const destinationOffset = typeof destination === 'number' ? destination : destination.offsetTop;
			const destinationOffsetToScroll = Math.round(documentHeight - destinationOffset < windowHeight ? documentHeight - windowHeight : destinationOffset);

			if ('requestAnimationFrame' in window === false) {
				window.scroll(0, destinationOffsetToScroll);
				if (callback) {
					callback();
				}
				return;
			}

			function scroll() {
				const now = 'now' in window.performance ? performance.now() : new Date().getTime();
				const time = Math.min(1, ((now - startTime) / duration));
				const timeFunction = easings[easing](time);
				window.scroll(0, Math.ceil((timeFunction * (destinationOffsetToScroll - start)) + start));

				if (Math.abs(window.scrollY - destinationOffsetToScroll) < 2) {
					if (callback) {
						callback();
					}
					return;
				}

				requestAnimationFrame(scroll);
			}

			scroll();
		}


		// ajax request START
			let load_count = 0
			const loader = document.getElementById('loader')

			const serialize = function(obj, prefix) {
				var str = [], p;
				for (p in obj) {
					if (obj.hasOwnProperty(p)) {
					var k = prefix ? prefix + "[" + p + "]" : p,
						v = obj[p];
						str.push((v !== null && typeof v === "object") ?
						serialize(v, k) :
						encodeURIComponent(k) + "=" + encodeURIComponent(v));
					}
				}
				return str.join("&");
			}

			const formdata = function(obj) {

				let formData = new FormData()

				for (const i in obj) {

					formData.append(i, obj[i])
				}

				return formData
			}

			async function post(endpoint, obj, is_file = false, is_loader = true) {
									
				try {

					if (is_loader && loader) {
						load_count++
						loader.classList.add('active')
						// document.dispatchEvent(new CustomEvent('loading', { 'detail': load_count }))
					}

					const url = endpoint

					let headers = {
						'Accept': 'application/json',
						'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
					}

					if (!is_file) {

						// headers['Content-Type'] = 'multipart/form-data'

						var response = await fetch(url, {
							method: 'POST',
							headers: headers,
							body: formdata(obj)
						})

					} else {

						headers['Content-Type'] = 'application/x-www-form-urlencoded'

						var response = await fetch(url, {
							method: 'POST',
							headers: headers,
							body: serialize(obj)
						})
					}
					
					let json = []

					try {

						json = await response.json()

					} catch (error) {}

					if (is_loader && loader) {
						load_count--
						if (load_count == 0)
							loader.classList.remove('active')
						// document.dispatchEvent(new CustomEvent('loading', { 'detail': load_count }))
					}

					if (!json.data) {
						return {
							success: false,
							message: "Fatal error",
							data: json,
						}
					}

					return json

				} catch (error) {

					console.error(error)
				}

				return {success: false, message: "Fatal error", data: {}}
			}
		// ajax request END
		
	// })



    function resize () {
        document.body.style.setProperty('--width', document.body.clientWidth)
    }
    resize()
    window.addEventListener('resize', resize)

	if ($('.first-header').el[0])
		$('.body-wrapper').css('min-height', 'calc( 100vh - '+$('footer').height()+'px - '+$('header').height()+'px - '+$('.first-header').height()+'px)')




;
 
     

    async function make_pagination(elm, showmore = false){

        let href = $(elm).child().attr('href')

        const response = await post(href, {}, true, true)

        if (response.success){
            
            if (showmore){
                
                html = $('#content-block').child().html()
                
                const elem = document.createElement('div');
                $(elem).addClass('showmore-content')
                $(elem).html(response.data.html)
                request_html = $(elem).child().html()
                elem.remove()
                
                $('#content-block').child().html(html + request_html)

            } else {
                $('#content-block').html(response.data.html)
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }

            $('#pagination').html(response.data.pagination)

            url = document.location.protocol + '//' + document.location.hostname + href
            history.pushState({}, '', url)

            $('.callback-form input[name="link"]').val(url)


        } else {

        }

        return false

    }



;
 
    if (is_mobile){

        $('.menu-item-wrapper-parent').on('click', function(e){

            if (e.target == $(this).child().el[0] && (e.target.classList.contains('back'))){

                e.preventDefault()

                that = $(this).child().el[0]

                submenu = $(that).parent().el[0].querySelector('.submenu')

                $(that).removeClass('back')
                $(submenu).removeClass('active')
                if (that.closest('ul').classList.contains('menu')){
                    $('header').removeClass('with-submenu')
                }

                let items = that.closest('ul').children

                if (that.closest('ul').closest('li'))
                    $(that.closest('ul').closest('li')).child('.menu-item.back').css('display', 'flex')

                for (var i = 0; i < items.length; i++){
                    if(!items[i].classList.contains('menu-item-wrapper-parent'))
                        $(items[i]).css('display', 'flex');
                }
            }
        })

        $('.menu-item-parent-svg').on('click', function (e) {
            e.preventDefault()
            submenu = $(this).parent().parent().el[0].querySelector('.submenu')

            if (!$(this).parent().el[0].classList.contains('back')){

                $(submenu).addClass('active')
                $(this).parent().addClass('back')
                $('header').addClass('with-submenu')

                let items = this.closest('ul').children

                if (this.closest('ul').closest('li'))
                    $(this.closest('ul').closest('li')).child('.menu-item.back').css('display', 'none')

                for (var i = 0; i < items.length; i++){
                    if (!items[i].classList.contains('menu-item-wrapper-parent'))
                        $(items[i]).css('display', 'none');
                }

            } else {

                $(this).parent().removeClass('back')
                $(submenu).removeClass('active')
                if (this.closest('ul').classList.contains('menu')){
                    $('header').removeClass('with-submenu')
                }

                let items = this.closest('ul').children

                if (this.closest('ul').closest('li'))
                    $(this.closest('ul').closest('li')).child('.menu-item.back').css('display', 'flex')

                for (var i = 0; i < items.length; i++){
                    if(!items[i].classList.contains('menu-item-wrapper-parent'))
                        $(items[i]).css('display', 'flex');
                }

            }

        });


    }

;
 
	
	$('.search-icon').on('click', function(){
		$(this).parent('form').el[0].submit();
	})

	$('.header-icons-search').on('click', function(){
		$('.search-form').css('display', 'block')
	})

	$('.search-clear').on('click', function(){
		$('.search-form').css('display', 'none')
	})

	$('#search-input').on('input', async function(){
		value = $(this).val()

		

		const response = await post(lang + '/api/search', {value: value}, false, false)

		if (response.success){
			$('.search-form-items').css('display', 'block')
			if (response.data.html){
				$('.non-search-text').css('display', 'none')
				$('.search-form-items-inner').css('display', 'block')
				$('.search-form-items-inner').html(response.data.html)
			} else {
				$('.search-form-items-inner').css('display', 'none')
				$('.non-search-text').css('display', 'block')
			} 

		} else {

		}

		if (!value){
			$('.search-form-items').css('display', 'none')
		}

	})

	$(document).on('mouseup', function (e) {
		var container = $('.search-form-items');
		if (!container.el[0].contains(e.target)){
			container.css('display', 'none');
		}
	});

	$('.toggle-menu').on('click', function(){
		$('header').toggleClass('active')
		$('body').toggleClass('blocked')
		// $('.header-wrapper').css('height', 'calc(' + $('header .container').height() + 'px + ' + $('#mobile-menu').height() + 'px)')
		$('.header-wrapper').toggleClass('active')

	})

	const appHeight = () => {
		const doc = document.documentElement
		doc.style.setProperty('--app-height', `${window.innerHeight}px`)
	}
	window.addEventListener('resize', appHeight)
	appHeight()

	const stickyElm = document.querySelector('header')

	const observer = new IntersectionObserver( 
		([e]) => e.target.classList.toggle('sticky', e.intersectionRatio < 1),
		{threshold: [1]}
	);

	observer.observe(stickyElm)


;
 
    $('.callback-form').on('submit', async function(e){
        e.preventDefault()

        name = $(this).el[0].querySelectorAll('input[name="name"]')[0].value
        phone = $(this).el[0].querySelectorAll('input[name="phone"]')[0].value
        message = $(this).el[0].querySelectorAll('textarea[name="message"]')[0].value
        link = $(this).el[0].querySelectorAll('input[name="link"]')[0].value
        price = $(this).el[0].querySelectorAll('input[name="price"]')[0].value

        
        const response = await post(lang + '/api/send-modal', {
            name: name,
            phone: phone,
            message: message,
            link: link,
            price: price,
        }, true, true)

        
        if (response.success){
            
            $($(this).el[0].querySelectorAll('.form-answer.error')[0]).css('display', 'none')
            $($(this).el[0].querySelectorAll('.form-answer.success')[0]).css('display', 'block')

            $(this).el[0].reset()
        } else {
            $($(this).el[0].querySelectorAll('.form-answer.error')[0]).css('display', 'none')
            $($(this).el[0].querySelectorAll('.form-answer.success')[0]).css('display', 'block')
        }

        return false;
    })

    function open_modal(modal, link, with_price = false){

        modal = '#modal-'+modal

        if (link)
            $(modal).el[0].querySelectorAll('input[name="link"]')[0].value = link

        if (with_price)
            $(modal).el[0].querySelectorAll('input[name="price"]')[0].value = $('#price').text()

        $('.form-answer').css('display', 'none')

        $(modal).addClass('active')

        scroll_top = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
        $($(modal).el[0].querySelector('.container-modal')).css('top', 'calc(' + scroll_top + 'px + 10vh)');
    }

    function close_modal() {
        $('.modal').removeClass('active');
    }

    $('.modal').on('click', function(e) {
        if (this == (e.target)) {
            close_modal()
        }
    })
    

;
 

    $('.counter-symbol').on('click', function(){

        counter_input = $(this).el[0].closest('.counter-inner').querySelector('.counter-input')
        step = parseInt($(counter_input).attr('step'))
        currency = $(counter_input).data('currency')
        
        if ($(this).el[0].classList.contains('counter-minus')){

            if (parseInt($(counter_input).val()) > 1) {
                $(counter_input).val((parseInt($(counter_input).val()) - step + ' ' + currency).trim())
            }

        } else {

            if (parseInt($(counter_input).val()) < 1000) {
                $(counter_input).val((parseInt($(counter_input).val()) + step + ' ' + currency).trim())
            }

        }

    })


    $('.product-info .counter-symbol').on('click', function(){
        
        counter_inputs = $('.product-info .counter-input')
        currency_input = $(counter_input).data('currency')

        price = $('#price').data('price')
        currency = $('#price').text().split(' ').slice(-1)[0].split('/')[0]
        
        new_price = $('#price').text().split(' ')

        counters = 1
        counter_inputs.el.forEach(counter_input => {
            counters *= parseInt($(counter_input).val())
        });

        new_price[1] = price * counters

        // if (counters == 1){
        //     new_price[2] = currency + '/' + currency_input
        // } else {
            new_price[2] = currency
        // }

        $('#price').text(new_price.join(' '))
    })

    $('.counter-input').on('change', function(){
        min = parseInt($(this).attr('min'))
        max = parseInt($(this).attr('max'))
        value = $(this).val()

        if (!((!isNaN(parseInt(value)) && isFinite(value)) && parseInt(value) >= min && parseInt(value) <= max)) {
            $(this).val(1);
            console.log(1)
        }
    })


;
 

    function open_cart_modal(){

        modal = '#modal-cart'

        $(modal).addClass('active')

        scroll_top = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
        $($(modal).el[0].querySelector('.container-modal')).css('top', 'calc(' + scroll_top + 'px + 10vh)');

    }

    function close_modal() {
        $('.modal').removeClass('active');
    }

    $('.modal').on('click', function(e) {
        if (this == (e.target)) {
            close_modal()
        }
    })
    

;
