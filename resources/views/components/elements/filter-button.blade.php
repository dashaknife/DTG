<div class="btn-filters" onclick="open_filters()">
    <svg class="btn-filters-svg" width="13" height="9" viewBox="0 0 13 9" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10.9864 0.855672H5.18567C5.0262 0.38201 4.57818 0.0397949 4.05142 0.0397949C3.52467 0.0397949 3.07665 0.38201 2.91717 0.855672H2.01172C1.80138 0.855672 1.63086 1.0262 1.63086 1.23653C1.63086 1.44687 1.80138 1.61739 2.01172 1.61739H2.9172C3.07668 2.09105 3.5247 2.43327 4.05145 2.43327C4.5782 2.43327 5.02622 2.09105 5.1857 1.61739H10.9865C11.1968 1.61739 11.3673 1.44687 11.3673 1.23653C11.3673 1.0262 11.1968 0.855672 10.9864 0.855672ZM4.05142 1.67155C3.81156 1.67155 3.61641 1.4764 3.61641 1.23653C3.61641 0.996666 3.81156 0.801514 4.05142 0.801514C4.29129 0.801514 4.48644 0.996666 4.48644 1.23653C4.48644 1.4764 4.29129 1.67155 4.05142 1.67155Z" fill="#059F97"/>
        <path d="M10.9864 4.11922H10.081C9.92148 3.64556 9.47344 3.30334 8.94671 3.30334C8.41998 3.30334 7.97196 3.64556 7.81249 4.11922H2.01172C1.80138 4.11922 1.63086 4.28975 1.63086 4.50008C1.63086 4.71042 1.80138 4.88094 2.01172 4.88094H7.81249C7.97196 5.3546 8.42001 5.69682 8.94674 5.69682C9.47346 5.69682 9.92151 5.3546 10.081 4.88094H10.9865C11.1968 4.88094 11.3673 4.71042 11.3673 4.50008C11.3673 4.28975 11.1968 4.11922 10.9864 4.11922ZM8.94674 4.9351C8.70687 4.9351 8.51172 4.73995 8.51172 4.50008C8.51172 4.26022 8.70687 4.06506 8.94674 4.06506C9.1866 4.06506 9.38175 4.26022 9.38175 4.50008C9.38175 4.73995 9.1866 4.9351 8.94674 4.9351Z" fill="#059F97"/>
        <path d="M10.9864 7.38265H6.81745C6.65797 6.90899 6.20996 6.56677 5.6832 6.56677C5.15645 6.56677 4.70843 6.90899 4.54895 7.38265H2.01172C1.80138 7.38265 1.63086 7.55317 1.63086 7.76351C1.63086 7.97384 1.80138 8.14437 2.01172 8.14437H4.54895C4.70843 8.61803 5.15645 8.96024 5.6832 8.96024C6.20996 8.96024 6.65797 8.61803 6.81745 8.14437H10.9865C11.1968 8.14437 11.3673 7.97384 11.3673 7.76351C11.3673 7.55317 11.1968 7.38265 10.9864 7.38265ZM5.6832 8.19855C5.44334 8.19855 5.24819 8.0034 5.24819 7.76353C5.24819 7.52367 5.44334 7.32852 5.6832 7.32852C5.92307 7.32852 6.11822 7.52364 6.11822 7.76351C6.11822 8.00337 5.92307 8.19855 5.6832 8.19855Z" fill="#059F97"/>
    </svg>    
    {{ $fields['filter_title'] }}
    <div class="btn-filters-count">{{ $count }}</div>    
</div>


@desktopcss
<style>
    
    .btn-filters{
        display: none;
    }

</style>
@mobilecss
<style>
    
    .btn-filters{
        display: flex;
        align-items: center;
        justify-content: center;
        height: 30px;
        width: 138px;
        border: 1px solid var(--color-second);
        border-radius: 5px;
        font-style: normal;
        font-weight: 450;
        font-size: 12px;
        line-height: 16px;
        color: var(--color-second);
    }

    .btn-filters-svg {
        width: 13px;
        height: 9px;
        margin-right: 5px;
    }

    .btn-filters-count{
        display: flex;
        align-items: center;
        justify-content: center;
        background: var(--color-second);
        border-radius: 50%;
        font-style: normal;
        font-weight: normal;
        text-align: center;
        font-size: 10px;
        line-height: 13px;
        color: var(--color-white);
        width: 14px;
        height: 14px;
        margin-left: 7px;
    }

</style>
@endcss

@js
<script>
    
    function open_filters(){
        $('#filters').addClass('active')
        mySliderPrice.onResize();
    }

</script>
@endjs