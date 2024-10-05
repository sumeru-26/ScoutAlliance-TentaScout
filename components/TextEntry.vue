<script setup>

    import { Input } from '@/components/ui/input';
    import { Label } from '@/components/ui/label'

    const props = defineProps(['name', 'label'])

    const text = ref('')
    setToStorage(props.name, text.value)
    
    watch(text, (newText, oldText) => {
        setToStorage(props.name, newText)
    })

</script>

<template>
    <Label :for="name.replace(/\./g, '_')">{{ props.label }}</Label>
    <Input :id="name.replace(/\./g, '_')" type="text" v-model="text" />
</template>