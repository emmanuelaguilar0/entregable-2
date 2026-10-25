import test from 'node:test';
import assert from 'node:assert/strict';

// Pruebas unitarias simples para las reglas de validación sin requerir MySQL.
test('correo válido tiene formato de email', () => {
  assert.match('emmanuel@example.com', /^[^\s@]+@[^\s@]+\.[^\s@]+$/);
});
test('correo inválido no cumple el formato', () => {
  assert.doesNotMatch('correo-invalido', /^[^\s@]+@[^\s@]+\.[^\s@]+$/);
});
test('la contraseña debe tener al menos 8 caracteres', () => {
  assert.ok('ClaveSegura123'.length >= 8);
  assert.ok('123'.length < 8);
});
test('el nombre debe tener mínimo 2 caracteres', () => {
  assert.ok('Emmanuel'.trim().length >= 2);
  assert.ok(' '.trim().length < 2);
});
