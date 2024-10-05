<script setup>    

    import {
        NumberField,
        NumberFieldContent,
        NumberFieldDecrement,
        NumberFieldIncrement,
        NumberFieldInput,
    } from '@/components/ui/number-field'
    import { Label } from '@/components/ui/label'

    const props = defineProps(['name', 'label'])

    
    const count = ref(0)
    setToStorage(props.name, count.value)
    
    watch(count, (newCount, oldCount) => {
      setToStorage(props.name, newCount)
    })

</script>

<template>
  <NumberField :id="name.replace(/\./g, '_')" :model-value="count" @update:model-value="(v) => count = v">
    <Label :for="name.replace(/\./g, '_')">{{ props.label }}</Label>
    <NumberFieldContent>
      <NumberFieldDecrement />
      <NumberFieldInput />
      <NumberFieldIncrement />
    </NumberFieldContent>
  </NumberField>
</template>