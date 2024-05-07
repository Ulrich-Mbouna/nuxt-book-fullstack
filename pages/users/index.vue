<template>
  <div>
    <h2 class="uk-heading-divider">Users List</h2>
    <error-boundary :error>
      <div class="" v-if="pending">
        <h3>Loading...</h3>
      </div>
      <div class="" v-else>
        <div class="" v-if="users.length <= 0">
          <div class="uk-card uk-card-default uk-card-body text-center rounded">
            <p class="text-xl uk-text-muted">No Users for the moment 😒</p>
          </div>
        </div>
        <div v-else class="uk-child-width-1-2@s uk-child-width-1-3@m uk-grid-small uk-child-width-1-1" uk-grid>
          <div class="" v-for="user in users" :key="user.id">
            <nuxt-link class="uk-card uk-card-small rounded-md uk-card-default uk-link-toggle uk-card-body">
              <h3 class="uk-card-title">{{ user.name }}</h3>
              <ul class="uk-list">
                <li>
                  <p><span class="font-medium">Id</span>: {{ user.id }}</p>

                </li>
                <li>
                  <p><span class="font-medium">Slug</span> : {{ user.slug }}</p>
                </li>
                <li>
                  <p><span class="font-medium">Crée le</span> : {{ format(new Date(user.createdAt), {
                    date: 'full', time: 'short'
                  }) }}</p>
                </li>
              </ul>
            </nuxt-link>
          </div>
        </div>
      </div>
    </error-boundary>
  </div>
</template>

<script lang="ts" setup>
import { format } from "@formkit/tempo";
import { io } from "socket.io-client";
defineOptions({
  name: 'UsersIndex'
})
const { data: users, error, pending } = await useF3tch('/users')

// For Socket
const runtimeConfig = useRuntimeConfig();
const socket = io(runtimeConfig.public.apiBaseUrl)

socket.on('users.changefeeds', data => {
  if (data.old_val === undefined && data.new_val === undefined) {
    return
  }

  if (data.old_val === null && data.new_val !== null) {
    UIkit.notification({
      message: `<span uk-icon="icon:check">Nouvel utilisateur crée</span>`,
      status: 'success',
      pos: 'top-right'
    })
    users.value.unshift(data.new_val)
  }

  if (data.new_val === null && data.old_val !== null) {
    let id = data.old_val.id
    let index = users.value.map(el => {
      return el.id
    }).indexOf(id)
    users.value.splice(index, 1)
  }

  if (data.new_val !== null && data.old_val !== null) {
    let id = data.new_val.id
    let index = users.value.findIndex(item => item.id === id)
    users.value.splice(index, 1, data.new_val)
  }
})
</script>

<style></style>
