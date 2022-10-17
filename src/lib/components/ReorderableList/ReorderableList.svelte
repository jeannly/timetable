<script>
    // Originally Order.svelte
    import { format_text } from "$lib/utils/format";
    import { slide } from "svelte/transition";

    export let options;
    export let rankings = [];
    export let parameters = {};

    $: if (rankings.length === 0) rankings = options.map(o => o.key);
    $: if (Object.keys(parameters).length === 0) parameters = options.reduce((obj, o) => ({
        ...obj,
        ...(Array.isArray(o.options) && o.options.length > 0 ? { [o.key]: o.options[0] } : {})
    }), {});

    $: sorted_options = options.sort((a, b) => rankings.indexOf(a.key) - rankings.indexOf(b.key));

    let dragged = null;
    let hovered = null;

    function drop(e) {
        e.preventDefault();

        let new_order = [...rankings];

        // Delete the old item;
        let item = new_order.splice(dragged, 1)[0];

        // Recalculate indexes
        if (dragged < hovered) hovered--;

        new_order = [
            ...new_order.slice(0, hovered),
            item,
            ...new_order.slice(hovered),
        ];

        rankings = [...new_order];
    }
</script>

<style lang="scss" src="./ReorderableList.scss" global>
</style>

<div id="container">
    {#each sorted_options as item, i}
        <div
            draggable="true"
            class="item numbered"
            class:hovered={hovered === i}
            on:dragstart={(e) => {
                e.dataTransfer.dropEffect = "move";

                dragged = i;
            }}
            on:dragend={() => {
                hovered = null;
                dragged = null;
            }}
            on:dragover={(e) => {
                e.preventDefault();
                e.dataTransfer.dropEffect = "move";

                hovered = i;
            }}
            on:dragleave={() => {
                hovered = null;
            }}
            on:drop={drop}
        >
            <p>{format_text(item.key)}</p>

            {#if Array.isArray(item.options) && item.options.length > 0}
                <select
                    bind:value={parameters[item.key]}
                >
                    {#each item.options as option}
                        <option value={option}>
                            {format_text(option)}
                        </option>
                    {/each}
                </select>
            {/if}
        </div>
    {/each}

    {#if hovered >= sorted_options.length - 1}
        <div
            class="item"
            class:hovered={hovered === sorted_options.length}
            transition:slide
            on:drop={drop}
            on:dragover={(e) => {
                e.preventDefault();
                e.dataTransfer.dropEffect = "move";

                hovered = sorted_options.length;
            }}
            on:dragleave={() => (hovered = null)}
        >
            <br />
        </div>
    {/if}
</div>