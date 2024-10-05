<script setup>
    
    const manualCodeInput = ref('')

    async function login(code) {
        const decoded = atob(code)
        // console.log(decoded)
        const [key, event, type] = decoded.split(' ')
        const headers = new Headers();
        headers.append("X-SA-Auth-Key", "testkey2")
        try {
            console.log(key)
            const appSchema = await $fetch('/api/app-schema', {
                method: 'GET',
                query: {
                    key: key,
                    event: event,
                    type: type
                }
            })
            console.log(appSchema)
            setToStorage('appSchema', JSON.stringify(appSchema.app))
        } catch (error) {
            console.log(error.message)
        }
        // const response = await fetch(SCOUTALLIANCE_API_URL + '/', {
        //     mode: 'no-cors',
        //     headers: {
        //         'X-SA-Auth-Key': 'asdf'
        //     }
        // })
    }

</script>


<template>
    <div class="flex flex-row min-h-screen justify-center items-center">
        <Card class="w-full max-w-sm">
            <CardHeader>
            <CardTitle class="text-2xl">
                Login
            </CardTitle>
            <CardDescription>
                Enter code or scan QR code
            </CardDescription>
            </CardHeader>
            <CardContent class="grid gap-4">
            <div class="grid gap-2">
                <Label for="code">Manual code</Label>
                <Input id="code" type="text" placeholder="[ code format ]" required v-model="manualCodeInput" />
            </div>
            </CardContent>
            <CardFooter>
            <Button @click.stop.prevent="login(manualCodeInput)" class="w-full">
                Sign in
            </Button>
            </CardFooter>
        </Card>
    </div>
</template>