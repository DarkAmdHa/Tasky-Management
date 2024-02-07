<!DOCTYPE html>
<html>
<head>
    <title>
        @if ($isUser)
            You have been invited to join a TaskyTasky Team!
        @else
            You have been invited to join TaskyTasky!
        @endif
    </title>
</head>
<body>
    @if($isUser)
        <p>
        <strong>{{$inviter}}</strong> would like to invite you to join the {{$team}} team!
        </p>
        <p>
            Click on the button below to join the team!
        </p>

    @else
        <p>
            <strong>{{$inviter}}</strong> would like to invite you to join the TaskyTasky!
        </p>
        <p>
            Click on the button below to join TaskyTasky!
        </p>
    @endif

<a href="
    @if($isUser)
        http://localhost:3000/login
    @else
        http://localhost:3000/register
    @endif
" style="padding: 5px 20px;background:orange;color:#fff;font-weight:bold;display:flex;border-radius:25px;width: fit-content;cursor: pointer;">Join</a>
</body>
</html>
