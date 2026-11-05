<script lang="ts">
    let {title, text}: { title: string, text: string } = $props();
</script>

<div class="w-full h-full flex flex-col toast-parent ">
    <div class="title-toast w-full flex items-center shrink-0">
        <div class="decorator-cube-detail"></div>
        <h4>{ title }</h4>
    </div>

    <div class="p-5">
        <p>{ text }</p>
    </div>
</div>

<style>
    .toast-parent {
        background-color: var(--default-bg-elements2);
        box-shadow: 4px 4px 0 var(--shadow-elements-color);
    }
    .title-toast {
        background-color: var(--bg-block-decorator);
    }
</style>