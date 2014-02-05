<div class="l-h-list">
  <p class="item schedule-text-middle">Same as: </p>
  <ul class="item l-h-list guru-schedule-copy-links">
    <% _.each(days, function(day) { %>
    <li class="item">
      <a data-daycode="<%= day.get('dayCode') %>">
        <%= day.get('dayCode') %>
      </a>
    </li>
    <% }); %>
  </ul>
</div>