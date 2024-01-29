<template>
    <div 
        class="modal fade d-block show"
        data-testid="modal"
        :class="{ 'modal-sm': size === 'sm', 'modal-lg': size === 'lg', 'modal-xl': size === 'xl' }"
        tabindex="-1" :aria-hidden="!show" v-if="show"
    >
        <div class="modal-dialog">
            <div class="modal-content">
                <div data-testid="modal-header" class="modal-header">
                    <slot name="header"></slot>
                </div>
                <div data-testid="modal-body" class="modal-body">
                    <slot name="body"></slot>
                </div>
                <div data-testid="modal-footer" class="modal-footer">
                    <slot name="footer"></slot>
                </div>
            </div>
        </div>
    </div>
    <Teleport to="body" v-if="show">
        <div data-testid="modal-backdrop" class="modal-backdrop fade show"></div>
    </Teleport>
</template>

<script lang="ts" setup>
    import { defineProps } from 'vue'

    const props = defineProps<{
        show?: boolean,
        size?: "sm"|"lg"|"xl"
    }>()
</script>