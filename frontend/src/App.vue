<script setup lang="ts">
import { ref } from "vue";
import HelloWorld from "./components/HelloWorld.vue";
import TheWelcome from "./components/TheWelcome.vue";
import { useApi } from "@/composables/useApi";
import { exampleService } from "@/services/example.service";

const { cargando, error, call } = useApi();
const mensaje = ref<string | null>(null);

async function obtenerTodos() {
  mensaje.value = null;
  const data = await call(() => exampleService.getAll());
  if (data !== null) {
    mensaje.value = JSON.stringify(data, null, 2);
  }
}
</script>

<template>
  <header>
    <img
      alt="Vue logo"
      class="logo"
      src="./assets/logo.svg"
      width="125"
      height="125"
    />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />
    </div>
  </header>

  <main>
    <TheWelcome />

    <section class="api-section">
      <button class="api-btn" :disabled="cargando" @click="obtenerTodos">
        {{ cargando ? "Cargando..." : "Obtener todos los registros" }}
      </button>
      <pre v-if="mensaje" class="api-respuesta">{{ mensaje }}</pre>
      <p v-if="error" class="api-error">{{ error }}</p>
    </section>
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}

.api-section {
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.api-btn {
  padding: 0.6rem 1.4rem;
  font-size: 1rem;
  background-color: #42b883;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.api-btn:hover:not(:disabled) {
  background-color: #33a06f;
}

.api-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.api-respuesta {
  background: #1e1e1e;
  color: #d4d4d4;
  padding: 1rem 1.5rem;
  border-radius: 8px;
  font-size: 0.95rem;
  max-width: 480px;
  width: 100%;
  white-space: pre-wrap;
  word-break: break-word;
}

.api-error {
  color: #e06c75;
  font-size: 0.95rem;
}
</style>
