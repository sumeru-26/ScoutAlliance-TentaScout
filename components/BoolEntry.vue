<script setup>

    import { Checkbox } from './ui/checkbox';
    import { Label } from '@/components/ui/label'

    const props = defineProps(['name', 'label'])

    const bool = ref('')
    setToStorage(props.name, bool.value)
    
    watch(bool, (newText, oldText) => {
        setToStorage(props.name, newText)
    })

</script>

<template>
    <div class="my-4">
    <Label :for="name.replace(/\./g, '_')">{{ props.label }}</Label>
    <Checkbox :id="name.replace(/\./g, '_')" v-model="bool" class="ml-2" />
    </div>
</template>