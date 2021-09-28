export default function buildIdTypes(id: number) {
  switch (id) {
    case 2:
      return {
        label: "Passport",
        value: 2,
      }
    case 3:
      return {
        label: "Drivers License",
        value: 3,
      }
    case 4:
      return {
        label: "ID Card",
        value: 4,
      }
  }
}
