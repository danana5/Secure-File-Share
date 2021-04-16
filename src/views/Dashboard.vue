<template>
    <h1>Dashboard</h1>
</template>
<script>
import db from "../firebaseInit"
export default {
    created(){
        console.log(db)
    }
}
</script>