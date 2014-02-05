<div class="l-h-list">
  <p class="item schedule-text-middle">Copy from: </p>
  <ul class="item l-h-list">
    <% _.each(days, function(day) { %>
    <li class="item">
      <a class="capitalize underline schedule-text-middle" data-daycode="<%= day.get('dayCode') %>">
        <%= day.get('dayCode') %>
      </a>
    </li>
    <% }); %>
  </ul>
</div>