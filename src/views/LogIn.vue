<script setup>
import { onBeforeMount, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import api from '@/api';

const login = ref({
    email: 'crebs@crebs.dev',
    password: '12345678',
    remember: false
});

const router = useRouter();
const store = useStore();

onBeforeMount(() => {
    tryLogin()
});

async function tryLogin() {
    try {
        if (!store.state.user.user.email) {
            var auth = await api.get('/user');

            if (auth.data.user) {
                store.commit('storeUser', auth.data);
            }
            setTimeout(() => {
                if (store.state.user.user.email) {
                    router.push('/');
                }
            }, 800);
        } else {
            setTimeout(() => {
                router.push('/'),
                    500
            })
        }

    } catch (e) {
        console.log(e?.response?.data.message)
    }
}

const handleLogin = async () => {
    try {
        await api.post('/login', {
            email: login.value.email,
            password: login.value.password,
            remember: login.value.remember
        })
            .then(auth => {
                store.commit('storeUser', auth.data);
                setTimeout(() => {
                    router.push('/'),
                        500
                })
            })

    } catch (error) {
        // console.log(error?.response?.data)
        console.log(error)
    }
}

</script>
<template>
    <div>
        <label for="E-mail" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            E-mail
        </label>
        <input type="text" id="E-mail" v-model="login.email"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-teal-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
    </div>
    <div>
        <label for="Senha" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Senha
        </label>
        <input type="password" id="Senha" v-model="login.password"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-teal-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
    </div>
    <div class="flex mt-1">
        <label for="E-mail" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Lembrar de min
        </label>
        <input type="checkbox" id="E-mail" v-model="login.remember"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-teal-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ml-1" />
    </div>
    <div class="mt-4 flex justify-center">
        <button type="button" @click.prevent="handleLogin"
            class="text-white bg-gradient-to-r from-green-600 to-green-900 dark:from-cyan-500 dark:to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 w-11/12 max-w-96">
            Login
        </button>
    </div>
    <p>{{ $store.state.user.name }}</p>
    <p>$store.state.user.name</p>
    <p>{{ $store.state.user }}</p>
</template>