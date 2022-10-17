<script>
  // Originally Subjects.svelte
  export let day;
  export let subjects;
  export let timetable;

  import { format_time } from "$lib/utils/format";
  const SUBJECT_PADDING = 0.25;
  const LUMINANCE_VALUES = [0.2126, 0.7152, 0.0722];
  const SRGB_THRESHOLD = 0.03928;
  const LUMINANCE_THRESHOLD = 0.1791;
  const PALETTE = [
    "#001f3f",
    "#0074D9",
    "#B10DC9",
    "#85144b",
    "#FF4136",
    "#FF851B",
    "#FFDC00",
    "#3D9970",
  ].map((c) => {
    let luminance = c
      .match(/^#(\w{2})(\w{2})(\w{2})/)
      .slice(1)
      .reduce((total, d, i) => {
        d = parseInt(d, 16);
        let srgb = d / 255;

        if (srgb <= SRGB_THRESHOLD) d = srgb / 12.92;
        else d = Math.pow((srgb + 0.055) / 1.055, 2.4);

        return total + d * LUMINANCE_VALUES[i];
      }, 0);

    return {
      color: c,
      text: luminance > LUMINANCE_THRESHOLD ? "black" : "white",
    };
  });

  // Calculate time frame for timetable
  $: times = timetable.reduce(
    ({ start, end }, subject) => ({
      start: start < subject.time ? start : subject.time,
      end: end > subject.time + subject.duration ? end : subject.time + subject.duration,
    }),
    {
      start: Infinity,
      end: 0,
    }
  );
</script>

<style lang="scss" src="./CalendarItem.scss" global>
</style>

<div class="subjects">
  <div class="ticks">
    {#each Array(Math.floor((times.end - times.start) / 60)) as _}
      <div />
    {/each}
    {#if (times.end - times.start) % 60 > 0}
      <div style:flex-grow={((times.end - times.start) / 60) % 1} />
    {/if}
  </div>
  {#each day as subject, j}
    <div
      class="subject"
      style:height="calc({(subject.duration / (times.end - times.start)) * 100}%
      - {SUBJECT_PADDING * 2}rem)"
      style:top="calc({((subject.time - times.start) /
        (times.end - times.start)) *
        100}% + {SUBJECT_PADDING}rem)"
      style:background={PALETTE[
        subjects.findIndex((s) => s.code === subject.code) % PALETTE.length
      ].color}
      style:color={PALETTE[
        subjects.findIndex((s) => s.code === subject.code) % PALETTE.length
      ].text}
    >
      <h5>
        {subjects.find((s) => s.code === subject.code).name}
        ({subject.code})
      </h5>
      <p>
        {subject.name}, {subject.campus}
        {subject.popularity !== null ? `(${subject.popularity}%)` : ""}
      </p>
      <p>
        {format_time(subject.time)} - {format_time(
          subject.time + subject.duration
        )}
      </p>
    </div>
  {/each}
</div>

