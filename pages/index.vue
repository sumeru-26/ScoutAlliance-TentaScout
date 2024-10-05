<script setup>
import { timestamp } from '@vueuse/core';


    // const TEST_SCHEMA = {
    //     'inputs': [
    //         {
    //             'type': 'num',
    //             'id': 'speaker',
    //             'label': 'Speaker',
    //         },
    //         {
    //             'type': 'num',
    //             'id': 'amp',
    //             'label': 'Amp',
    //         },
    //         {
    //             'type': 'text',
    //             'id': 'other.notes',
    //             'label': 'Notes'
    //         }
    //     ]
    // }

    // const test = ref({})

    const match = ref(0)
    const bot = ref(0)

    function getAppSchema() {
        if (import.meta.client) {
            console.log(JSON.parse(getFromStorage('appSchema')))
            return JSON.parse(getFromStorage('appSchema'))
        } else {
            console.error('failed')
        }
    }

    function getInputs() {
        try {
            console.log(getAppSchema().inputs)
            return getAppSchema().inputs
        } catch (e) {
            console.log(e)
        }
        
    }

    function getEntryJson() {
        var data = {}
        for (var input of getAppSchema().inputs) {
            if (input.id.includes('.')) {
                var split = input.id.split('.')
                var inter = {}
                inter[split.at(-1)] = fixType(getFromStorage(input.id), input.type)
                split.pop()
                while (split.length > 1) {
                    let temp = {}
                    Object.assign(temp, inter)
                    inter = {}
                    inter[split.at(-1)] = temp
                    split.pop()
                }
                data[split[0]] = inter
            } else {
                data[input.id] = fixType(getFromStorage(input.id), input.type)
            }
        }
        const appSchema = getAppSchema()
        const metadata = {
            event: appSchema.event,
            type: appSchema.type,
            match: match.value,
            bot: bot.value,
            team: appSchema.team,
            timestamp: Date.now()
        }
        const entry = {
            metadata: metadata,
            data: data
        }
        console.log(entry)
        return entry
    }

    function fixType(value, type) {
        if (type === 'num') {
            return parseInt(value)
        } else if (type === 'bool') {
            return value == 'true'
        }
        else {
            return value
        }
    }

    async function submit() {
        await $fetch('/api/add', {
            method: 'POST',
            query: {
                team: getAppSchema().team
            },
            body: getEntryJson()
        })
    }

    // function logout() {
    //     localStorage.clear()
    // }

</script>


<template>
    <!-- <div class="mx-5 flex justify-end">
        <Button variant="outline" @click.stop.prevent="logout()">Logout</Button>
    </div> -->
    <NumberField id="metadata.bot" :model-value="bot" @update:model-value="(v) => bot = v">
        <Label for="metadata.bot">Bot</Label>
        <NumberFieldContent>
            <NumberFieldDecrement />
            <NumberFieldInput />
            <NumberFieldIncrement />
        </NumberFieldContent>
    </NumberField>
    <NumberField id="metadata.match" :model-value="match" @update:model-value="(v) => match = v">
        <Label for="metadata.match">Match</Label>
        <NumberFieldContent>
            <NumberFieldDecrement />
            <NumberFieldInput />
            <NumberFieldIncrement />
        </NumberFieldContent>
    </NumberField>
        <ul defer v-for="input in getInputs()" :key="input">
            <NumEntry v-if="input.type === 'num'" :name="input.id" :label="input.label" />
            <TextEntry v-if="input.type === 'text'" :name="input.id" :label="input.label" />
            <BoolEntry v-if="input.type === 'bool'" :name="input.id" :label="input.label" />
        </ul>
        <Button @click.stop.prevent="submit()">Submit</Button>
    <!-- <Button @click.stop.prevent="test=getEntryJson()">test</Button>
    <p>{{ test }}</p> -->
</template>