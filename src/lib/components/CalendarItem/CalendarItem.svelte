<script>
  // Originally Subjects.svelte
  export let subject;
  export let subject_id;
  export let times;
  export let background_colour; // background_colour needs to be exported so that different subjects have different colours
  export let mode; // determines if the item is draggable or not

  import { draggable } from "@neodrag/svelte";

  import { text_colouriser } from "$lib/utils/colours";
  import { format_time } from "$lib/utils/format";
  
  const SUBJECT_PADDING = 0.25;
  
  $: customisable = mode === "customiser" ? true : false;

  $: text_colour = text_colouriser(background_colour).text_colour;
</script>

<style lang="scss" src="./CalendarItem.scss" global>
</style>
{#if !customisable}
<div
  class="subject"
  style:height="calc({(subject.duration / (times.end - times.start)) * 100}% - {SUBJECT_PADDING *
    2}rem)"
  style:top="calc({((subject.time - times.start) / (times.end - times.start)) *
    100}% + {SUBJECT_PADDING}rem)"
  style:background={background_colour}
  style:color={text_colour}
>
  <h5>
    <!-- subject_id.name is the Class name -->
    {subject_id.name}
    ({subject_id.code})
  </h5>
  <p>
    <!-- Subject.name refers to the class type: lectorial, tutorial, etc. -->
    {subject.name}, {subject.campus}
    {subject.popularity !== null ? `(${subject.popularity}%)` : ""}
  </p>
  <p>
    {format_time(subject.time)} - {format_time(subject.time + subject.duration)}
  </p>
</div>
{:else}
<div
  use:draggable
  class="subject"
  style:height="calc({(subject.duration / (times.end - times.start)) * 100}% - {SUBJECT_PADDING *
    2}rem)"
  style:top="calc({((subject.time - times.start) / (times.end - times.start)) *
    100}% + {SUBJECT_PADDING}rem)"
  style:background={background_colour}
  style:color={text_colour}
>
  <h5>
    <!-- subject_id.name is the Class name -->
    {subject_id.name}
    ({subject_id.code})
  </h5>
  <p>
    <!-- Subject.name refers to the class type: lectorial, tutorial, etc. -->
    {subject.name}, {subject.campus}
    {subject.popularity !== null ? `(${subject.popularity}%)` : ""}
  </p>
  <p>
    {format_time(subject.time)} - {format_time(subject.time + subject.duration)}
  </p>
</div>
{/if}
