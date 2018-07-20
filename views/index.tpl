<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>SRemotePlayer</title>
    <script src="<%- baseUrl %>/common/jquery-3.3.1.min.js"></script>
    <script src="<%- baseUrl %>/common/common.js"></script>
    <link rel="stylesheet" href="<%- baseUrl %>/common/common.css">
  </head>
  <body>
    <div class="page-header">SRemotePlayer</div>
    <div class="page-content">
      <a href="<%- baseUrl %>/play" class="ajax-button play-solid"></a>
      <a href="<%- baseUrl %>/pause" class="ajax-button pause-solid"></a>
      <a href="<%- baseUrl %>/volume/up" class="ajax-volume-button plus-solid"></a>
      <a href="<%- baseUrl %>/volume/down" class="ajax-volume-button minus-solid"></a>
      <a href="<%- baseUrl %>/next" class="ajax-button forward-solid"></a><br>
      <p id="volume"></p>
    </div>
  </body>
</html>