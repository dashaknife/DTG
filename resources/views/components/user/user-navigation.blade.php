<div class="user-navigation">

    <div 
        class="h5 color-text user-nav-item @if($route == 'user') active @endif" 
        onclick="change_user_menu('{{ route('user', '', false) }}')" 
    >
        {{ $fields['nav_item_1'] }}
    </div>

    <div 
        class="h5 color-text user-nav-item @if($route == 'userhistory') active @endif" 
        onclick="change_user_menu('{{ route('userhistory', '', false) }}')" 

    >
        {{ $fields['nav_item_2'] }}
    </div>

    <div 
        class="h5 color-text user-nav-item @if($route == 'userwished') active @endif" 
        onclick="change_user_menu('{{ route('userwished', '', false) }}')" 

    >
        {{ $fields['nav_item_3'] }}
    </div>

</div>

@desktopcss
<style>
    
    .user-navigation {
        width: 300px;
    }

    .user-nav-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        padding: 20px 0;
        border-bottom: 1px solid var(--color-back-and-stroke);
        cursor: pointer;
        transition: .3s;
    }

    .user-nav-item:last-child {
        border-bottom: none;
    }

    .user-nav-item.active, 
    .user-nav-item:hover {
        color: var(--color-second);
    }

    .user-nav-item::after {
        content: "";
        display: block;
        width: 7px;
        height: 7px;
        border: 1px solid var(--color-text);
        transform: rotate(45deg);
        border-left: none;
        border-bottom: none;
        transition: .3s;
    }

    .user-nav-item.active:after, 
    .user-nav-item:hover::after{
        border-color: var(--color-second);
    }

</style>
@mobilecss
<style>
    
</style>
@endcss

@js
<script>

    async function change_user_menu(route){
        
        const response = await post(route, {}, true, true)

        if (response.success){
            
            $('#user-navigation').html(response.data.navigation)
            $('#user-content').html(response.data.content)

            url = document.location.protocol + '//' + document.location.hostname + route
            history.pushState({}, '', url)

        } else {

        } 


    }

</script>
@endjs