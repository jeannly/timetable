<script>
    export let timetable;
    export let all_subject_ids;
    export let mode; // "default": generate fixed timetables, "customiser": drag and drop

    import { draggable } from "@neodrag/svelte";

    import { convert_by_subject_timetable_to_by_day_timetable } from "$lib/utils/generate";
    import { get_palette_from_subject_codes } from "$lib/utils/colours";
    import { format_duration } from "$lib/utils/format";
    import Subject from "./Subject.svelte";

    const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
    const PALETTE = get_palette_from_subject_codes(all_subject_ids);

    // Dimensions to be passed to the subject containers, so they can be sized accordingly
    let cal_width = 0;
    let cal_height = 0;

    $: days = convert_by_subject_timetable_to_by_day_timetable(timetable);

    $: summaries = days.map((day) => {
        let { start, end, time } = day.reduce(
            ({ start, end, time }, subject) => ({
                start: start < subject.time ? start : subject.time,
                end:
                    end > subject.time + subject.duration
                        ? end
                        : subject.time + subject.duration,
                time: time + subject.duration,
            }),
            {
                start: Infinity,
                end: 0,
                time: 0,
            }
        );

        let total = end - start;
        let breaks = total - time;

        if (isFinite(total) && isFinite(breaks)) {
            let summary = format_duration(total);

            if (breaks > 0) summary += ` (${format_duration(breaks)} break)`;

            return summary;
        } else return "Free Day";
    });

    // Calculate time frame for timetable
    $: times = timetable.reduce(
        ({ start, end }, subject) => ({
            start: start < subject.time ? start : subject.time,
            end:
                end > subject.time + subject.duration
                    ? end
                    : subject.time + subject.duration,
        }),
        {
            start: Infinity,
            end: 0,
        }
    );
</script>

<style lang="scss" src="./CalendarView.scss" global>
</style>

<div id="calendar" bind:clientWidth={cal_width} bind:clientHeight={cal_height}>
    {#each days as day, i}
        <div class="day">
            <div class="header">
                <h3>{DAYS[i]}</h3>
                <p>{summaries[i]}</p>
            </div>
            <div class="column">
                <div class="ticks">
                    {#each Array(Math.floor((times.end - times.start) / 60)) as _}
                        <div />
                    {/each}
                    {#if (times.end - times.start) % 60 > 0}
                        <div
                            style:flex-grow={((times.end - times.start) / 60) % 1}
                        />
                    {/if}
                </div>
<!-- TODO: Change how the subject overlays are rendered when in customiser mode -->
                {#each day as subject, j}
                    <Subject 
                        subject={subject}
                        subject_id={all_subject_ids.find((subject_id) => subject_id.code === subject.code)} 
                        times={times}
                        background_colour={PALETTE[subject.code]}
                        mode={mode}
                        cal_width={cal_width}
                        cal_height={cal_height}
                    />
                {/each}
            </div>
        </div>
    {/each}
</div>