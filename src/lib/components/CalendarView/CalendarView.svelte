<script>
    export let timetable;
    export let subjects;

    import { text_colouriser } from '$lib/utils/colours';
    import { format_time, format_duration } from "$lib/utils/format";

    const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
    const SUBJECT_PADDING = 0.25;

    const PALETTE = [
        "#001f3f",
        "#0074D9",
        "#B10DC9",
        "#85144b",
        "#FF4136",
        "#FF851B",
        "#FFDC00",
        "#3D9970",
    ].map(text_colouriser);

    $: days = timetable.reduce(
        (days, subject) => [
            ...days.slice(0, subject.day),
            [...days[subject.day], subject],
            ...days.slice(subject.day + 1),
        ],
        DAYS.map((_) => [])
    );

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

<div id="calendar">
    {#each days as day, i}
        <div class="day">
            <div class="header">
                <h3>{DAYS[i]}</h3>
                <p>{summaries[i]}</p>
            </div>
            <div class="subjects">
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

                {#each day as subject, j}
                    <div
                        class="subject"
                        style:height="calc({(subject.duration /
                            (times.end - times.start)) *
                            100}% - {SUBJECT_PADDING * 2}rem)"
                        style:top="calc({((subject.time - times.start) /
                            (times.end - times.start)) *
                            100}% + {SUBJECT_PADDING}rem)"
                        style:background={PALETTE[
                            subjects.findIndex((s) => s.code === subject.code) %
                                PALETTE.length
                        ].color}
                        style:color={PALETTE[
                            subjects.findIndex((s) => s.code === subject.code) %
                                PALETTE.length
                        ].text}
                    >
                        <h5>
                            {subjects.find((s) => s.code === subject.code).name}
                            ({subject.code})
                        </h5>
                        <p>
                            {subject.name}, {subject.campus}
                            {subject.popularity !== null
                                ? `(${subject.popularity}%)`
                                : ""}
                        </p>
                        <p>
                            {format_time(subject.time)} - {format_time(
                                subject.time + subject.duration
                            )}
                        </p>
                    </div>
                {/each}
            </div>
        </div>
    {/each}
</div>