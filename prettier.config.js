module.exports = {
    plugins: [
      async () => {
        const plugin = await import('prettier-plugin-tailwindcss');
        return plugin.default;
      },
    ],
  };
  