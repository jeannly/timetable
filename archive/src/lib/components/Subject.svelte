<script>
  // Originally Subjects.svelte
  export let subject;
  export let subject_id;
  export let times;
  export let background_colour; // background_colour needs to be exported so that different subjects have different colours
  export let mode; // determines if the item is draggable or not
  export let cal_width;
  export let cal_height;

  import { draggable } from "@neodrag/svelte";

  import { text_colouriser } from "$lib/utils/colours";
  import { format_time } from "$lib/utils/format";
  
  const SUBJECT_PADDING = 0.25;
    
  function set_subject_options(visible) {
    console.log(cal_height);
    console.log(cal_width);
    return;
  }

  let drag_options = {
    bounds: document.querySelector('#calendar'),
    cancel: '.subject-preference-alternative'
  };

  $: customisable = mode === "customiser" ? true : false;

  $: text_colour = text_colouriser(background_colour).text_colour;
</script>

<style lang="scss" src="./Subject.scss" global>
</style>
{#if !customisable}
<div
  class="subject"
  style:height="calc({(subject.duration / (times.end - times.start)) * 100}% - {SUBJECT_PADDING *
    2}rem)"
  style:top="calc({((subject.time - times.start) / (times.end - times.start)) *
    100}% + {SUBJECT_PADDING}rem)"
  style:background={background_colour}
  style:color={text_colour} >
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
<!-- TODO: Subject container contains 1) currently active subject preference 2) possible preference alternatives, if relevant -->
<div 
  class="subject-container"
  use:draggable={drag_options}
  style:height="{cal_height}px"
  style:width="{cal_width}px">
  <div
    on:mouseenter={() => (set_subject_options("visible"))}
    on:mouseleave={() => (set_subject_options("hidden"))}
    class="subject draggable"
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
</div>
{/if}
