<template>
  <table>
    <tr>
      <th>Tournament</th>
      <th>Location</th>
      <th class="active">Date <span class="mdi mdi-arrow-down"></span></th>
    </tr>
    <tr>
      <td><a href="#">Ungdomsturnering Fredericia</a></td>
      <td>Fredericia</td>
      <td>Saturday, October 24, 2020</td>
    </tr>
    <tr>
      <td><a href="#">Ungdomsturnering Korsør</a></td>
      <td>Korsør</td>
      <td>Saturday, October 24, 2020</td>
    </tr>
  </table>
</template>

<script>
export default {
  name: 'Table',
  /* props: { */
  /*   msg: String */
  /* } */
  data: function() {
    return {
      tournaments: [
        {
          name: "Ungdomsturnering Fredericia",
          loc: "Fredericia",
          dat: "Saturday, October 24, 2020",
        },
        {
          name: "Ungdomsturnering Korsør",
          loc: "Korsør",
          dat: "Saturday, October 24, 2020",
        },
        {
          name: "Ungdomsturnering Skive",
          loc: "Skive",
          dat: "Saturday, October 17, 2020",
        },
      ]
    }
  }
}
</script>

<style scoped lang="scss">
  @import "../styles/colors.module.scss";

  table th.active {
    border-bottom: 1px solid $color3;
  }
</style>

